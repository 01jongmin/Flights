use crate::MyDatabase;
use crate::models::{Airport};
use crate::schema::Airports::dsl::Airports;
use rocket::serde::json::Json;
use rocket::http::Status;
use rocket_okapi::openapi;
use diesel::{prelude::*, sql_query, sql_types::*};
use serde::{Serialize};
use schemars::JsonSchema;

#[openapi(tag = "Airports")]
#[get("/?<page_size>&<page>")]
pub async fn get_all_airports(conn: MyDatabase, page_size: Option<u32>, page: Option<u32>) -> Result<Json<Vec<Airport>>, Status> {
    let page_size = page_size.unwrap_or(10);
    let page = page.unwrap_or(1);

    let all_airports = conn.run( move |c| {
        Airports.limit(page_size.into())
                .offset(((page - 1) * page_size).into())
                .load::<Airport>(c)
    }).await;

    match all_airports {
        Ok(all_airports) => Ok(Json(all_airports)),
        Err(_) => Err(Status::BadRequest),
    }
}

#[openapi(tag = "Airports")]
#[get("/<country_code>?<query>")]
pub async fn get_all_airports_query(conn: MyDatabase, country_code: String, query: String) -> Result<Json<Vec<Airport>>, Status> {
    let all_airports = conn.run( move |c| {
        let query = format!("
            SELECT * FROM Airports
                WHERE country = '{}'
            AND (city LIKE '%{}%'
            OR name LIKE '%{}%')",
            country_code,
            query,
            query);

        return sql_query(query).load(c);
    }).await;

    match all_airports {
        Ok(all_airports) => Ok(Json(all_airports)),
        Err(_) => Err(Status::BadRequest),
    }
}

#[derive(Serialize, QueryableByName, JsonSchema, Debug)]
pub struct AirportDistance {
    #[sql_type="Integer"]
    pub target_id: i32,
    #[sql_type="Double"]
    pub distance: f64,
    #[sql_type="Double"]
    pub hours: f64,
}

#[openapi(tag="Airports")]
#[get("/distance_limit?<airport_id>&<hour_limit>")]
pub async fn distance_limit(conn: MyDatabase, airport_id: u32, hour_limit: u32) -> Result<Json<Vec<AirportDistance>>, Status> {
    let res = conn.run( move |c| {
        let query = format!("
                WITH accessibleFlights AS (SELECT * FROM Routes WHERE source_id = {}),
                lLatLonFlights AS (SELECT accessibleFlights.id, airline_id, source_id, target_id, lat AS sLat, lon as sLon FROM accessibleFlights JOIN Airports ON accessibleFlights.source_id=Airports.id),
                rlatLonFlights AS (SELECT lLatLonFlights.id, airline_id, source_id, target_id, sLat, sLon, lat AS aLat, lon as aLon FROM lLatLonFlights JOIN Airports ON lLatLonFlights.target_id=Airports.id),
                intermediaryCalculation AS (SELECT rlatLonFlights.id, target_id, (alat - slat) * PI() / 180 AS dLat,
                                                  (alon - slon) * PI() / 180   as dLon,
                                                  slat * PI() / 180        AS rLat1,
                                                   alat * PI() / 180        AS rLat2
                                           FROM rlatLonFlights),
                distancedirectAir AS (SELECT id, target_id, 6371 * 2 * ATAN2(SQRT(SIN(dLat/2) * SIN (dLat/2) + COS (rLat1) * COS (rLat2) * SIN (dLon/2) * SIN(dLon/2)), SQRT(1-(SIN(dLat/2) * SIN (dLat/2) + COS (rLat1) * COS (rLat2) * SIN (dLon/2) * SIN(dLon/2))))
                AS distance
                FROM intermediaryCalculation)
                SELECT target_id, CAST(MIN(distance) AS Double) as distance,  CAST(MIN(distance/804.67) AS DOUBLE) AS hours FROM distancedirectAir GROUP BY (target_id) HAVING hours < {} ORDER BY hours",
            airport_id,
            hour_limit);

        return sql_query(query).load(c);
    }).await;

    match res {
        Ok(res) => Ok(Json(res)),
        Err(_) => Err(Status::BadRequest),
    }
}


#[derive(Serialize, QueryableByName, JsonSchema, Debug)]
pub struct BfsResult {
    #[sql_type="Integer"]
    pub id: i32,
    #[sql_type="Integer"]
    pub distance: i32,
}

#[openapi(tag="Airports")]
#[get("/bfs?<src_id>&<tgt_id>&<limit>")]
pub async fn bfs(conn: MyDatabase, src_id: u32, tgt_id: u32, limit:u32) -> Result<Json<Vec<BfsResult>>, Status> {
    let res = conn.run( move |c| {
        let query = format!("
        WITH RECURSIVE bfs (id, distance) AS (
        SELECT Routes.source_id, 0
        FROM Routes
        WHERE Routes.source_id={}
        UNION
        SELECT routes2.target_id, bfs.distance + 1
        FROM bfs
        JOIN Routes AS routes2 ON bfs.id=routes2.source_id
        WHERE bfs.id <> routes2.target_id AND bfs.distance + 1 <= {}),
        d_table(id, distance) AS (
            SELECT id, MIN(distance) AS dist
            FROM bfs
            GROUP BY id
        ),
         distTable AS (SELECT id, distance FROM bfs WHERE (id, distance) IN (SELECT * FROM d_table) ORDER BY distance)
     SELECT * FROM distTable WHERE id={}",
            src_id,
            limit,
            tgt_id);

        return sql_query(query).load(c);
    }).await;

    match res {
        Ok(res) => Ok(Json(res)),
        Err(_) => Err(Status::BadRequest),
    }
}

#[derive(Serialize, QueryableByName, JsonSchema)]
pub struct BfsRouteResult {
    #[sql_type="Integer"]
    pub airport_id: i32,
    #[sql_type="Integer"]
    pub distance: i32,
    #[sql_type="Integer"]
    pub parent_airport_id: i32,
    #[sql_type="Integer"]
    pub route_id: i32,
}

#[openapi(tag="Airports")]
#[get("/bfs_route?<src_id>&<limit>")]
pub async fn bfs_route(conn: MyDatabase, src_id: u32, limit: u32) -> Result<Json<Vec<BfsRouteResult>>, Status> {
    let res = conn.run( move |c| {
        let query = format!("
        WITH RECURSIVE bfs (airport_id, distance, parent_airport_id, route_id) AS (
            SELECT Routes.source_id, 0, 0, 0
            FROM Routes
            WHERE Routes.source_id={}
            UNION
            SELECT routes2.target_id, bfs.distance + 1, routes2.source_id, routes2.id
            FROM bfs
            JOIN Routes AS routes2 ON bfs.airport_id=routes2.source_id
            WHERE bfs.airport_id <> routes2.target_id AND bfs.distance + 1 <= {})
        , temp AS (
            SELECT airport_id, MIN(distance) as minDist, parent_airport_id
            FROM bfs
            GROUP BY airport_id, parent_airport_id
        )
        SELECT bfs.airport_id, bfs.distance, bfs.parent_airport_id, bfs.route_id
        FROM bfs INNER JOIN temp
        ON bfs.airport_id = temp.airport_id AND bfs.distance = temp.minDist AND bfs.parent_airport_id = temp.parent_airport_id",
        src_id,
        limit);

        return sql_query(query).load(c);
    }).await;

    match res {
        Ok(res) => Ok(Json(res)),
        Err(_) => Err(Status::BadRequest),
    }
    
}
