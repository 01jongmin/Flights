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
            "SELECT YEAR(date) as year, AVG(temp) as average_temp FROM Weather 
            JOIN Cities ON Weather.city_id = Cities.Id
            WHERE ascii_name = '{}' AND
                  MONTH(date) >= {} AND
                  MONTH(date) <= {} AND
                  DAY(date) >= {} AND
                  DAY(date) <= {}
            GROUP BY YEAR(date)",
            city,
            start_m,
            end_m,
            start_d,
            end_d,
        );

        return sql_query(query).load(c);
    }).await;

    match average_temp {
        Ok(average_temp) => Ok(Json(average_temp)),
        Err(_) => Err(Status::BadRequest),
    }
}

#[derive(Serialize, QueryableByName, JsonSchema)]
pub struct AverageCityTempResponse {
    #[sql_type="VarChar"]
    name: String,
    #[sql_type="Double"]
    temp: f64,
}

#[openapi(tag = "Weather")]
#[get("/city?<low>&<high>")]
pub async fn get_temp_range_city(conn: MyDatabase, low: f32, high: f32) -> Result<Json<Vec<AverageCityTempResponse>>, Status> {
    let average_city_temp = conn.run(move |c| {
        let query = format!(
            "WITH averageWeathers AS (SELECT Cities.id AS cid, Cities.name AS name, AVG(temp) AS temp FROM Weather
            JOIN Cities ON Weather.city_id = Cities.Id
            GROUP BY Cities.id)
            SELECT name, temp
            FROM averageWeathers
            WHERE temp >= {} AND temp <= {}",
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
