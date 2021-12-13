use crate::MyDatabase;
use crate::models::{Landmark};
use rocket::http::Status;
use rocket::serde::json::Json;
use diesel::{prelude::*, sql_query, sql_types::*};
use rocket_okapi::openapi;
use serde::{Serialize};
use schemars::JsonSchema;

#[openapi(tag = "Landmarks")]
#[get("/?<country_code>")]
pub async fn get_landmark_countries(conn: MyDatabase, country_code: String) -> Result<Json<Vec<Landmark>>, Status> {
    let country_landmarks = conn.run(move |c| {
        let query = format!(
            "SELECT * FROM Landmarks
            WHERE Landmarks.country = '{}'",
            country_code);
        sql_query(query).load(c)
    }).await;

    match country_landmarks {
        Ok(country_landmarks) => Ok(Json(country_landmarks)),
        Err(_) => Err(Status::BadRequest),
    }
}
