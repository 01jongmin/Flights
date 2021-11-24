use rocket_sync_db_pools::{database};
use rocket::figment::{self, value::{Map, Value}, util::map};

use rocket_okapi::request::{OpenApiFromRequest, RequestHeaderInput};
use rocket_okapi::gen::OpenApiGenerator;

use dotenv::dotenv;
use std::{env};

#[database("mysql_db")]
pub struct MyDatabase(diesel::MysqlConnection);

impl<'r> OpenApiFromRequest<'r> for MyDatabase {
    fn from_request_input(
        _gen: &mut OpenApiGenerator,
        _name: String,
        _required: bool,
    ) -> rocket_okapi::Result<RequestHeaderInput> {
        Ok(RequestHeaderInput::None)
    }
}

pub fn get_database_figment() -> figment::Figment {
    dotenv().ok();

    let db: Map<&str, Value> = map! {
        "url" => env::var("DB_CONNECTION_URL")
                            .expect("missing env vavriable DB_CONNECTION_URL")
                            .into(),
        "pool_size" => env::var("DB_POOL_SIZE")
                            .expect("missing env vavriable DB_POOL_SIZE")
                            .parse::<i32>()
                            .expect("DB_POOL_SIZE IS NOT INT")
                            .into(),
    };

    rocket::Config::figment().merge(("databases", map!["mysql_db" => db]))
}
