use crate::schema::{AirlineAlliances, Countries};
use serde::{Serialize, Deserialize};

#[derive(Queryable, QueryableByName, Serialize, Deserialize, Clone)]
#[table_name="AirlineAlliances"]
pub struct AirlineAlliance {
    pub airline: i32,
    pub alliance: String,
}

#[derive(QueryableByName, Serialize, Deserialize)]
#[table_name="Countries"]
pub struct Country {
    pub name: String,
    pub iso_code: String,
}
