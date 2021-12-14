use crate::MyDatabase;
use crate::models::{Airline};
use rocket::http::Status;
use rocket::serde::json::Json;
use diesel::{prelude::*, sql_query};
use rocket_okapi::openapi;

///  - Returns all airlines for a given alliance name
#[openapi(tag = "Airlines")]
#[get("/?<airline_id>")]
pub async fn get_airline_by_id(conn: MyDatabase, airline_id: String) -> Result<Json<Vec<Airline>>, Status> {
    let res = conn.run( move |c| {
        let query = format!(
            "SELECT * FROM Airlines
            WHERE id = {}",
            airline_id);

        return sql_query(query).load(c);
    }).await;

    match res {
        Ok(t) => Ok(Json(t)),
        Err(_) => Err(Status::BadRequest),
    }
}
