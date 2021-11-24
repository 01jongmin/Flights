use crate::MyDatabase;
use crate::models::{Plane};
use crate::schema::Planes::dsl::Planes;
use rocket::http::Status;
use rocket::serde::json::Json;
use diesel::{prelude::*, sql_query, sql_types::*};
use rocket_okapi::openapi;
use serde::{Serialize};
use schemars::JsonSchema;

#[derive(Serialize, QueryableByName, JsonSchema)]
pub struct RoutesSourceTarget {
    #[sql_type="Nullable<Varchar>"]
    source_city: Option<String>,
    #[sql_type="Nullable<Varchar>"]
    target_city: Option<String>,
}

#[openapi(tag = "Planes")]
#[get("/routes?<model_name>")]
pub async fn routes_with_plane_model(conn: MyDatabase, model_name: String) -> Result<Json<Vec<RoutesSourceTarget>>, Status> {
    let routes = conn.run( move |c| {
        let query = format!(
            "SELECT SourcePort.city as source_city, DestiPort.city as target_city FROM Routes
                JOIN Airports AS SourcePort on SourcePort.id = Routes.source_id
                JOIN Airports AS DestiPort on Routes.target_id = DestiPort.id
            JOIN Planes P on Routes.plane_id = P.iata
            WHERE P.name = '{}'",
            model_name);

        return sql_query(query).load(c);
    }).await;

    match routes {
        Ok(routes) => Ok(Json(routes)),
        Err(_) => Err(Status::BadRequest),
    }
}

#[openapi(tag = "Planes")]
#[get("/")]
pub async fn get_all_planes(conn: MyDatabase) -> Result<Json<Vec<Plane>>, Status> {
    let all_planes = conn.run( |c| {
        Planes.load::<Plane>(c)
    }).await;

    match all_planes {
        Ok(all_planes) => Ok(Json(all_planes)),
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
