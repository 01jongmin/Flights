use crate::schema::{AirlineAlliances, Countries, Alliances, Planes};
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


