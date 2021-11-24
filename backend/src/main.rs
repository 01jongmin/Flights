#[macro_use] extern crate rocket;
#[macro_use] extern crate diesel;

mod models;
mod schema;
mod alliances;
mod countries;
mod weather;
mod db;
mod cors;
mod planes;

use rocket::{Build, Rocket};

use db::MyDatabase;

use rocket_okapi::{mount_endpoints_and_merged_docs, openapi_get_routes_spec};
use rocket_okapi::swagger_ui::{make_swagger_ui, SwaggerUIConfig};

#[rocket::main]
async fn main() {
    let launch_result = create_server().launch().await;
    match launch_result {
        Ok(()) => println!("Rocket shut down gracefully."),
        Err(err) => println!("Rocket had an error: {}", err),
    };
}

pub fn create_server() -> Rocket<Build> {
    let mut building_rocket = rocket::custom(db::get_database_figment())
            .attach(db::MyDatabase::fairing())
            .attach(cors::get_cors_option())
            .mount("/api", 
                make_swagger_ui(&SwaggerUIConfig {
                    url: "../openapi.json".to_owned(),
                    ..Default::default()
                }),
            );

    let openapi_settings = rocket_okapi::settings::OpenApiSettings::default();

    mount_endpoints_and_merged_docs! {
        building_rocket, "/".to_owned(), openapi_settings,
        "/alliances" => openapi_get_routes_spec![openapi_settings: alliances::get_all_alliances, 
                                                                   alliances::alliance_airlines,
                                                                   alliances::alliance_airports],
        "/countries" => openapi_get_routes_spec![openapi_settings: countries::get_all_countries],
        "/weather" => openapi_get_routes_spec![openapi_settings: weather::get_average_temp,
                                                                 weather::get_temp_range_city],
        "/planes" => openapi_get_routes_spec![openapi_settings: planes::get_all_planes,
                                                                planes::routes_with_plane_model],
                                                                 //weather::get_temp_range_city],
        //"/message" => message::get_routes_and_docs(&openapi_settings),
    };

    building_rocket
}
