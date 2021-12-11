use crate::MyDatabase;
use crate::models::{Airport};
use crate::schema::Airports::dsl::Airports;
use rocket::serde::json::Json;
use rocket::http::Status;
use rocket_okapi::openapi;
use diesel::{prelude::*, sql_types::*};
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

#[derive(Serialize, QueryableByName, JsonSchema, Debug)]
struct AirportDistance {
    #[sql_type="Integer"]
    pub target_id: i32,
    #[sql_type="Double"]
    pub distance: f64,
    #[sql_type="Double"]
    pub hours: f64,
}
