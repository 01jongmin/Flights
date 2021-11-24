use crate::MyDatabase;
use crate::models::{Alliance, AirlineAlliance};
use crate::schema::Alliances::dsl::Alliances;
use rocket::http::Status;
use rocket::serde::json::Json;
use diesel::{prelude::*, sql_query, sql_types::*};
use rocket_okapi::openapi;
use serde::{Serialize};
use schemars::JsonSchema;

#[derive(Serialize, QueryableByName, JsonSchema)]
struct AirlineName {
    #[sql_type="Varchar"]
    name: String,
}

#[openapi(tag = "Alliances")]
#[get("/<alliance_name>/airlines")]
pub async fn alliance_airlines(conn: MyDatabase, alliance_name: String) -> Result<Json<Vec<String>>, Status> {
    let all_alliance_airline = conn.run( move |c| {
        let query = format!(
            "SELECT A.name as name FROM Alliances
            JOIN AirlineAlliances AA on Alliances.id = AA.alliance
            JOIN Airlines A on AA.airline = A.id
            WHERE Alliances.name = '{}'",
            alliance_name);

        return sql_query(query).load(c);
    }).await;

    match all_alliance_airline {
        Ok(all_alliance_airline) => Ok(Json(all_alliance_airline.into_iter().map(|a: AirlineName| a.name).collect())),
        Err(_) => Err(Status::BadRequest),
    }
}

#[derive(Serialize, QueryableByName, JsonSchema, Debug)]
struct AirportName {
    #[sql_type="Char"]
    name: String,
}

#[openapi(tag = "Alliances")]
#[get("/<alliance_name>/airports")]
pub async fn alliance_airports(conn: MyDatabase, alliance_name: String) -> Result<Json<Vec<String>>, Status> {
    let all_alliance_airports = conn.run( move |c| {
        let query = format!(
            "WITH CorrAirline AS (SELECT Airlines.id FROM Airlines
            JOIN AirlineAlliances AA on Airlines.id = AA.airline
            JOIN Alliances A on A.id = AA.alliance
            WHERE A.name = '{}')
            SELECT DISTINCT Airports.name FROM Routes
            JOIN Airports ON Routes.source_id = Airports.id
            WHERE airline_id IN (SELECT * FROM CorrAirline)
            UNION
            SELECT DiSTINCT Airports.name FROM Routes
            JOIN Airports ON Routes.target_id = Airports.id
            WHERE airline_id IN (SELECT * FROM CorrAirline)",
            alliance_name);

        return sql_query(query).load(c);
    }).await;

    match all_alliance_airports {
        Ok(all_alliance_airports) => Ok(Json(all_alliance_airports.into_iter().map(|a: AirportName| a.name).collect())),
        Err(_) => Err(Status::BadRequest),
    }
}


#[openapi(tag = "Alliances")]
#[get("/")]
pub async fn get_all_alliances(conn: MyDatabase) -> Result<Json<Vec<Alliance>>, Status> {
    let all_alliances = conn.run( |c| {
        Alliances.load::<Alliance>(c)
    }).await;

    match all_alliances {
        Ok(all_alliances) => Ok(Json(all_alliances)),
        Err(_) => Err(Status::BadRequest),
    }
}

//#[get("/airlines")]
//pub async fn get_all_airline(conn: MyDatabase) -> Result<Json<Vec<String>>, Status> {
    //let all_alliances = conn.run( |c| {
        //Alliances.load::<Alliance>(c)
    //}).await;

    //match all_alliances {
        //Ok(all_alliances) => Ok(Json(all_alliances)),
        //Err(_) => Err(Status::BadRequest),
    //}
//}
