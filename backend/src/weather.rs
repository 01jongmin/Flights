use crate::MyDatabase;
use rocket::http::Status;
use rocket::serde::json::Json;
use diesel::{prelude::*, sql_query, sql_types::*};
use rocket_okapi::openapi;
use serde::{Serialize};
use schemars::JsonSchema;

#[derive(Serialize, QueryableByName, JsonSchema)]
pub struct AverageYearTempResponse {
    #[sql_type="BigInt"]
    year: i64,
    #[sql_type="Double"]
    average_temp: f64,
}

#[openapi(tag = "Weather")]
#[get("/average_temp?<city>&<start_m>&<start_d>&<end_m>&<end_d>")]
pub async fn get_average_temp(conn: MyDatabase, city: String, start_m: i32, start_d: i32, end_m: i32, end_d: i32) -> Result<Json<Vec<AverageYearTempResponse>>, Status> {
    let average_temp = conn.run(move |c| {
        let query = format!(
            "WITH wID AS (SELECT weatherID FROM (
                          SELECT airID,
                                 weatherID,
                                 6371 * 2 * ATAN2(SQRT(SIN(dLat / 2) * SIN(dLat / 2) +
                                                       COS(rLat1) * COS(rLat2) * SIN(dLon / 2) * SIN(dLon / 2)), SQRT(
                                                              1 - (SIN(dLat / 2) * SIN(dLat / 2) +
                                                                   COS(rLat1) * COS(rLat2) * SIN(dLon / 2) * SIN(dLon / 2))))
                                     AS distance
                          FROM (SELECT airID,
                                       weatherID,
                                       (lat2 - lat1) * PI() / 180 AS dLat,
                                       (lon2 - lon1) * PI() / 180 as dLon,
                                       lat1 * PI() / 180          AS rLat1,
                                       lat2 * PI() / 180          AS rLat2
                                FROM (SELECT a.id   AS airID,
                                             ws.id  AS weatherID,
                                             a.lat  as lat1,
                                             a.lon  as lon1,
                                             ws.lat as lat2,
                                             ws.lon as lon2
                                      FROM (SELECT * FROM Airports WHERE id = {} LIMIT 1) a
                                               JOIN WeatherStation ws
                                      WHERE a.country = ws.country) t) d
                          ORDER BY distance
                      ) d LIMIT 1)
            SELECT YEAR(date), AVG(temp) FROM Weather
            WHERE Weather.station_id IN (SELECT * FROM wID) AND
                  MONTH(date) >= {} AND
                  MONTH(date) <= {} AND
                  DAY(date) >= {} AND
                  DAY(date) <= {}
            GROUP BY YEAR(date)",
            city,
            start_m,
            end_m,
            start_d,
            end_d);

        return sql_query(query).load(c);
    }).await;

    match average_temp {
        Ok(average_temp) => Ok(Json(average_temp)),
        Err(_) => Err(Status::BadRequest),
    }
}

#[derive(Serialize, QueryableByName, JsonSchema)]
pub struct AverageCityTempResponse {
    #[sql_type="Integer"]
    airport_id: i32,
    #[sql_type="Double"]
    avgTemp: f64,
}

/// - Complex Query
#[openapi(tag = "Weather")]
#[get("/city?<low>&<high>")]
pub async fn get_temp_range_city(conn: MyDatabase, low: f32, high: f32) -> Result<Json<Vec<AverageCityTempResponse>>, Status> {
    let average_city_temp = conn.run(move |c| {
        let query = format!(
            "
            WITH temp1 AS (
                SELECT A.id as airport_id, A.name as airport_name, WS.id as station_id, A.lat as lat1, WS.lat AS lat2, A.lon as lon1, WS.lon AS lon2
                FROM Airports as A
                   JOIN WeatherStation AS WS ON A.country = WS.country
            ), temp2 AS (
                SELECT airport_id,
                       airport_name,
                       station_id,
                       (lat2 - lat1) * PI() / 180 AS dLat,
                       (lon2 - lon1) * PI() / 180   as dLon,
                       lat1 * PI() / 180        AS rLat1,
                       lat2 * PI() / 180        AS rLat2
                FROM temp1
            ), AiportWeatherStation AS (
                SELECT airport_id, airport_name, station_id, 6371 * 2* ASIN(SQRT(SIN(dLat/2) * SIN (dLat/2) + COS (rLat1) * COS (rLat2) * SIN (dLon/2) * SIN(dLon/2))) AS distance
                FROM temp2
            ), temp3 AS (
                SELECT airport_id, airport_name, MIN(distance) as minDistance
                FROM AiportWeatherStation
                GROUP BY airport_id, airport_name
            ), minDistance AS (
                SELECT AWS.airport_id, AWS.airport_name, station_id
                FROM AiportWeatherStation AWS INNER JOIN temp3
                ON AWS.airport_id = temp3.airport_id AND AWS.distance = temp3.minDistance
            )
            SELECT minDistance.airport_id, AVG(Weather.temp) as avgTemp FROM minDistance
            JOIN Weather ON minDistance.station_id = Weather.station_id
            GROUP BY minDistance.airport_id, minDistance.airport_name
            HAVING avgTemp >= {} AND avgTemp <= {}",
            low,
            high
        );

        return sql_query(query).load(c);
    }).await;

    match average_city_temp {
        Ok(average_city_temp) => Ok(Json(average_city_temp)),
        Err(_) => Err(Status::BadRequest),
    }
}
