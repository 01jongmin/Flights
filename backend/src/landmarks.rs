use crate::MyDatabase;
use crate::models::{Landmark};
use rocket::http::Status;
use rocket::serde::json::Json;
use diesel::{prelude::*, sql_query, sql_types::*};
use rocket_okapi::openapi;
use serde::{Serialize};
use schemars::JsonSchema;

#[openapi(tag = "Countries")]
#[get("/?<code>")]
pub async fn get_landmark_countries(conn: MyDatabase, code: String) -> Result<Json<Vec<Landmark>>, Status> {
    let countries = conn.run(move |c| {
        let query = format!(
            "SELECT DISTINCT Countries.name as name, Countries.iso_code as iso_code FROM Countries
            JOIN CountryAliases CA on Countries.iso_code = CA.country
            WHERE CA.name LIKE '%{}%'",
            name_query
            );
        sql_query(query).load(c)
    }).await;

    match countries {
        Ok(countries) => Ok(Json(countries)),
        Err(_) => Err(Status::BadRequest),
    }
}
