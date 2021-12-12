use crate::MyDatabase;
use rocket::http::Status;
use rocket::serde::json::Json;
use diesel::{prelude::*, sql_query, sql_types::*};
use rocket_okapi::openapi;
use serde::{Serialize};
use schemars::JsonSchema;


#[derive(Serialize, QueryableByName, JsonSchema)]
pub struct AirlineRoute {
    #[sql_type="Varchar"]
    sName: String,
    #[sql_type="Varchar"]
    sCity: String,
    #[sql_type="Varchar"]
    sCountry: String,
    #[sql_type="Char"]
    sIso: String,
    #[sql_type="Char"]
    sIata: String,
    #[sql_type="Double"]
    sLat: f64,
    #[sql_type="Double"]
    sLon: f64,
    #[sql_type="Varchar"]
    tName: String,
    #[sql_type="Varchar"]
    tCity: String,
    #[sql_type="Varchar"]
    tCountry: String,
    #[sql_type="Char"]
    tIso: String,
    #[sql_type="Char"]
    tIata: String,
    #[sql_type="Double"]
    tLat: f64,
    #[sql_type="Double"]
    tLon: f64,
}

///  - Inner line doc
#[openapi(tag = "Routes")]
#[get("/<airline_id>")]
pub async fn airline_routes(conn: MyDatabase, airline_id: i32) -> Result<Json<Vec<AirlineRoute>>, Status> {
    let res = conn.run( move |c| {
        let query = format!(
            "SELECT src.name AS sName, src.city AS sCity, srcC.name AS sCountry,
                   src.country AS sIso, src.iata AS sIata, src.lat AS sLat, src.lon AS sLon,
                   tgt.name AS tName, tgt.city AS tCity, srcT.name AS tCountry,
                   tgt.country AS tIso, tgt.iata AS tIata, tgt.lat AS tLat, tgt.lon AS tLon, tgt.lat AS tLat, tgt.lon AS tLon
            FROM Routes
            JOIN Airports src on Routes.source_id = src.id
            JOIN Airports tgt on Routes.target_id = tgt.id
            JOIN Countries srcC on src.country = srcC.iso_code
            JOIN Countries srcT on tgt.country = srcT.iso_code
            WHERE Routes.airline_id = {}",
            airline_id);

        return sql_query(query).load(c);
    }).await;

    match res {
        Ok(res) => Ok(Json(res)),
        Err(_) => Err(Status::BadRequest),
    }
}
