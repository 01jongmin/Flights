#[macro_use] extern crate rocket;
extern crate dotenv;

use rocket::serde::{Deserialize, Serialize};
use rocket::serde::json::{Json, Value, json};
use rocket_sync_db_pools::{database};
use diesel::{prelude::*, sql_query, QueryableByName, sql_types::*};
use rocket::figment::{value::{Map}, util::map};

use dotenv::dotenv;
use std::{env};

#[database("mysql_db")]
struct MyDatabase(diesel::MysqlConnection);

//#[get("/")]
#[get("/world")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/hello/<name>")]
fn hello(name: &str) -> String {
    format!("Hello, {}!", name)
}

//#[table_name="Country"]
#[derive(Serialize, Deserialize, Clone, QueryableByName)]
#[serde(crate = "rocket::serde")]
pub struct Country {
    #[sql_type = "Text"]
    pub name: String,
    #[sql_type = "Text"]
    pub iso_code: String
}

fn load_from_db(conn: &diesel::MysqlConnection) {
    let countries : std::vec::Vec<Country> = sql_query("SELECT * FROM Countries").load(conn).unwrap();

    for c in countries {
        println!("{}", c.name);
    }
}


#[get("/logs/<id>")]
async fn get_logs(conn: MyDatabase, id: usize) -> String {
    conn.run(|c| load_from_db(c)).await;
    //let countries = sql_query("SELECT * FROM Countries").load(&*conn);
    //load_from_db();
    return format!("Hello");
}

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct Point {
    x: i32,
    y: i32,
    z: String
}

#[post("/todo", data = "<task>")]
fn new(task: Json<Point>) -> Value {
    println!("{}", task.y);
    println!("{}", task.z);
    json!({ "status": "ok" })
}

#[launch]
fn rocket() -> _ {
    dotenv().ok();

    let db: Map<_, Value> = map! {
        "url" => env::var("DB_CONNECTION_URL").expect("missing env vavriable DB_CONNECTION_URL").into(),
        "pool_size" => env::var("DB_POOL_SIZE").expect("missing env vavriable DB_POOL_SIZE").parse::<i32>().expect("DB_POOL_SIZE IS NOT INT").into(),
    };

    let figment = rocket::Config::figment().merge(("databases", map!["mysql_db" => db]));


    rocket::custom(figment).attach(MyDatabase::fairing()).mount("/", routes![index, hello, new, get_logs])
}
