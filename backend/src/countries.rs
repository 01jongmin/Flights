use crate::MyDatabase;
use crate::models::{Country, Airport};
use rocket::http::Status;
use rocket::serde::json::Json;
use diesel::{prelude::*, sql_query, sql_types::*};
use rocket_okapi::openapi;
use serde::{Serialize};
use schemars::JsonSchema;


/// - Returns countries by referencing alias names
#[openapi(tag = "Countries")]
#[get("/?<name_query>")]
pub async fn get_countries(conn: MyDatabase, name_query: Option<String>) -> Result<Json<Vec<Country>>, Status> {
    let name_query = name_query.unwrap_or(String::new());
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

#[derive(Serialize, QueryableByName, JsonSchema)]
pub struct CountryCount {
    #[sql_type="Varchar"]
    name: String,
    #[sql_type="BigInt"]
    count: i64
}


#[openapi(tag = "Countries")]
#[get("/airports?<name_query>")]
pub async fn get_airports_for_country(conn: MyDatabase, name_query: String) -> Result<Json<Vec<Airport>>, Status> {
    let country_airports = conn.run(move |c| {
        let query = format!(
            "SELECT * FROM Airports
            WHERE Airports.country = '{}'",
            name_query
            );
        sql_query(query).load(c)
    }).await;

    match country_airports {
        Ok(country_airports) => Ok(Json(country_airports)),
        Err(_) => Err(Status::BadRequest),
    }
}

/// - Number of distinct airports grouped by country reachable from any airport in the provided country. (i.e. we can reach 33 airports in Mexico if we start from any airport in the US)
#[openapi(tag = "Countries")]
#[get("/destinations?<country_code>")]
pub async fn destination_count(conn: MyDatabase, country_code: String) -> Result<Json<Vec<CountryCount>>, Status> {
    let res = conn.run( move |c| {
        let query = format!(
            "SELECT DestiC.name as name, COUNT(DISTINCT DestiPort.id) as count FROM Airports AS SourcePort
            JOIN Routes on SourcePort.id = Routes.source_id
            JOIN Airports AS DestiPort on Routes.target_id = DestiPort.id
            JOIN Countries SourceC on SourcePort.country = SourceC.iso_code
            JOIN Countries DestiC on DestiPort.country = DestiC.iso_code
            WHERE SourceC.iso_code = '{}'
            GROUP BY DestiC.name",
            country_code);

        return sql_query(query).load(c);
    }).await;

    match res {
        Ok(res) => Ok(Json(res)),
        Err(_) => Err(Status::BadRequest),
    }
 }

#[derive(Serialize, QueryableByName, JsonSchema)]
pub struct ManufacturerAirport {
    #[sql_type="Char"]
    country: String,
    #[sql_type="VarChar"]
    mft: String,
    #[sql_type="BigInt"]
    total: i64,
    #[sql_type="Integer"]
    id: i32,
    #[sql_type="VarChar"]
    name: String,
    #[sql_type="Char"]
    iata: String,
    #[sql_type="Char"]
    icao: String,
    #[sql_type="Double"]
    lat: f64,
    #[sql_type="Double"]
    lon: f64,
}

#[openapi(tag = "Countries")]
#[get("/<country_name>/manufacturer")]
pub async fn manufacturer_country(conn: MyDatabase, country_name: String) -> Result<Json<Vec<ManufacturerAirport>>, Status> {
    let res = conn.run( move |c| {
        let query = format!(
            "WITH PlanesByMFT AS (SELECT iata, SUBSTRING_INDEX(name, ' ', 1) AS mft FROM Planes),
             RoutesN AS (SELECT * FROM Routes JOIN PlanesByMFT ON Routes.plane_id = PlanesByMFT.iata),
            RoutesNL AS (SELECT RoutesN.id, source_id, target_id, plane_id, RoutesN.iata, mft, Airports.country AS countryS FROM RoutesN JOIN Airports ON RoutesN.source_id=Airports.id),
            RoutesNR AS (SELECT RoutesNL.id, source_id, target_id, plane_id, RoutesNL.iata, mft, countryS, Airports.country AS countryT FROM RoutesNL JOIN Airports ON RoutesNL.target_id=Airports.id),
             fromSource AS (SELECT source_id, countryS AS country, mft, COUNT(*) AS num FROM RoutesNR rnr GROUP BY source_id, countryS, mft),
            toSource AS (SELECT target_id, countryT AS country , mft, COUNT(*) AS num FROM RoutesNR GROUP BY target_id, countryT, mft),
            finalTotal AS (SELECT f.country AS country, f.mft, source_id, f.num + t.num AS total FROM fromSource f JOIN toSource t on f.source_id=t.target_id AND f.country = t.country AND f.mft = t.mft),
            minVal AS (SELECT country, mft, MAX(total) AS max from finalTotal GROUP BY country, mft),
             minAir AS (SELECT f.country AS country, f.mft AS mft, total, source_id FROM finalTotal f INNER JOIN minVal m ON m.country = f.country AND m.mft = f.mft AND m.max = f.total ORDER BY mft, total, country),
            interFinal AS (SELECT minAir.country AS countryX, mft, total, id, name, city, iata, icao, lat, lon, alt, timezone, dst, tz FROM minAir JOIN Airports ON minAir.source_id = Airports.id AND minAir.country = Airports.country ORDER BY mft, countryX)
            SELECT countryX as country, mft, total, id, name, city, iata, icao, lat, lon FROM interFinal WHERE countryX = '{}'",
            country_name);

        return sql_query(query).load(c);
    }).await;

    match res {
        Ok(res) => Ok(Json(res)),
        Err(e) => {
            print!("{}", e);
            Err(Status::BadRequest)
        }
    }
 }
