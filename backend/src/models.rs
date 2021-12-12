use crate::schema::{AirlineAlliances, Countries, Alliances, Planes, Airports};
use serde::{Serialize, Deserialize};
use schemars::JsonSchema;

#[derive(Queryable, QueryableByName, Serialize, Deserialize, Clone)]
#[table_name="AirlineAlliances"]
pub struct AirlineAlliance {
    pub airline: i32,
    pub alliance: String,
}

#[derive(QueryableByName, Serialize, Deserialize, JsonSchema)]
#[table_name="Countries"]
pub struct Country {
    pub name: String,
    pub iso_code: String,
}

#[derive(Queryable, QueryableByName, Serialize, Deserialize, JsonSchema)]
#[table_name="Alliances"]
pub struct Alliance {
    pub id: String,
    pub name: String,
    pub image: String,
}

#[derive(Queryable, QueryableByName, Serialize, Deserialize, JsonSchema)]
#[table_name="Planes"]
pub struct Plane {
    pub iata: String,
    pub icao: String,
    pub name: String,
}

#[derive(Queryable, QueryableByName, Serialize, Deserialize, JsonSchema)]
#[table_name="Airports"]
pub struct Airport {
    pub id: i32,
    pub name: String,
    pub city: Option<String>,
    pub country: String,
    pub iata: Option<String>,
    pub icao: Option<String>,
    pub lat: Option<f64>,
    pub lon: Option<f64>,
    pub alt: Option<i32>,
    pub timezone: Option<f64>,
    pub dst: Option<String>,
    pub tz: Option<String>
}