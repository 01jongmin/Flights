use crate::MyDatabase;
use crate::models::{Country};
use rocket::http::Status;
use rocket::serde::json::Json;
use diesel::{prelude::*, sql_query, sql_types::*};
use rocket_okapi::openapi;
use serde::{Serialize};
use schemars::JsonSchema;

#[openapi(tag = "Countries")]
#[get("/")]
pub async fn get_all_countries(conn: MyDatabase) -> Result<Json<Vec<Country>>, Status> {
    let countries = conn.run(|c| {
        sql_query("SELECT * FROM Countries").load(c)
    }).await;

    match countries {
        Ok(countries) => Ok(Json(countries)),
        Err(_) => Err(Status::BadRequest),
    }
}

#[derive(Serialize, QueryableByName, JsonSchema)]
pub struct CountryCount {
    #[sql_type="Varchar"]
    name: String,
    #[sql_type="BigInt"]
    count: i64
}

#[openapi(tag = "Countries")]
#[get("/destinations?<country_name>")]
pub async fn destination_count(conn: MyDatabase, country_name: String) -> Result<Json<Vec<CountryCount>>, Status> {
    let res = conn.run( move |c| {
        let query = format!(
            "SELECT DestiC.name as name, COUNT(DISTINCT DestiPort.id) as count FROM Airports AS SourcePort
            JOIN Routes on SourcePort.id = Routes.source_id
            JOIN Airports AS DestiPort on Routes.target_id = DestiPort.id
            JOIN Countries SourceC on SourcePort.country = SourceC.iso_code
            JOIN Countries DestiC on DestiPort.country = DestiC.iso_code
            WHERE SourceC.name = '{}'
            GROUP BY DestiC.name",
            country_name);

        return sql_query(query).load(c);
    }).await;

    match res {
        Ok(res) => Ok(Json(res)),
        Err(_) => Err(Status::BadRequest),
    }
 }
//#[openapi(tag = "Alliances")]
//#[get("/")]
//pub async fn get_all_alliances(conn: MyDatabase) -> Result<Json<Vec<Alliance>>, Status> {
    //let all_alliances = conn.run( |c| {
        //Alliances.load::<Alliance>(c)
    //}).await;

    //match all_alliances {
        //Ok(all_alliances) => Ok(Json(all_alliances)),
        //Err(_) => Err(Status::BadRequest),
    //}
//}
