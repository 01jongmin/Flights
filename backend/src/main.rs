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
mod airports;
mod routes;
mod landmarks;

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
        "/countries" => openapi_get_routes_spec![openapi_settings: countries::get_countries,
                                                                   countries::get_country_name,
                                                                   countries::get_airports_for_country,
                                                                   countries::destination_count,
                                                                   countries::manufacturer_country],
        "/weather" => openapi_get_routes_spec![openapi_settings: weather::get_average_temp,
                                                                 weather::get_temp_range_city],
        "/planes" => openapi_get_routes_spec![openapi_settings: planes::get_all_planes,
                                                                planes::routes_with_plane_model],
        "/airports" => openapi_get_routes_spec![openapi_settings: airports::get_all_airports,
                                                                  airports::distance_limit,
                                                                  airports::get_all_airports_query],
        "/routes" => openapi_get_routes_spec![openapi_settings: routes::airline_routes],
        "/landmarks" => openapi_get_routes_spec![openapi_settings: landmarks::get_landmark_countries],
    };

    building_rocket
}
