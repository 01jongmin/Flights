use crate::MyDatabase;
use crate::models::{Country};
use rocket::http::Status;
use rocket::serde::json::Json;
use diesel::{prelude::*, sql_query, sql_types::*};
use rocket_okapi::openapi;
use serde::{Serialize};
use schemars::JsonSchema;

#[openapi(tag = "Countries")]
#[get("/countries")]
pub async fn get_all_countries(conn: MyDatabase) -> Result<Json<Vec<Country>>, Status> {
    let countries = conn.run(|c| {
        sql_query("SELECT * FROM Countries").load(c)
    }).await;

    match countries {
        Ok(countries) => Ok(Json(countries)),
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
