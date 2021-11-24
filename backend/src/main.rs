#[macro_use] extern crate rocket;
#[macro_use] extern crate diesel;
extern crate rocket_cors;

mod models;
mod schema;

use rocket_sync_db_pools::{database};
use rocket::figment::{value::{Map, Value}, util::map};
use rocket::serde::json::Json;
use serde::Serialize;
use diesel::result::Error as DieselError;

use dotenv::dotenv;
use std::{env};

use rocket_cors::{AllowedHeaders, AllowedOrigins};
use rocket::http::Method;

use models::{Country};
use diesel::{prelude::*, sql_query};

use rocket::http::Status;

#[database("mysql_db")]
struct MyDatabase(diesel::MysqlConnection);

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/countries")]
async fn get_logs(conn: MyDatabase) -> Result<Json<Vec<Country>>, Status> {
    let countries = conn.run(|c| {
        sql_query("SELECT * FROM Countries").load(c)
    }).await;

    match countries {
        Ok(countries) => Ok(Json(countries)),
        Err(_) => Err(Status::BadRequest),
    }
}

#[launch]
fn rocket() -> _ {
    dotenv().ok();

    let allowed_origins = AllowedOrigins::all();

    let cors = rocket_cors::CorsOptions {
        allowed_origins,
        allowed_methods: vec![Method::Get].into_iter().map(From::from).collect(),
        allowed_headers: AllowedHeaders::some(&["Authorization", "Accept"]),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors().expect("Error setting up cors");


    let db: Map<_, Value> = map! {
        "url" => env::var("DB_CONNECTION_URL").expect("missing env vavriable DB_CONNECTION_URL").into(),
        "pool_size" => env::var("DB_POOL_SIZE").expect("missing env vavriable DB_POOL_SIZE").parse::<i32>().expect("DB_POOL_SIZE IS NOT INT").into(),
    };

    let figment = rocket::Config::figment().merge(("databases", map!["mysql_db" => db]));

    rocket::custom(figment)
            .attach(MyDatabase::fairing())
            .attach(cors)
            .mount("/", routes![index, get_logs])
}
