use rocket::http::Method;
use rocket_cors::{Cors, AllowedHeaders, AllowedOrigins};

pub fn get_cors_option() -> Cors {
    let allowed_origins = AllowedOrigins::some_regex(&["http://rocket-env.eba-jzvxeuty.us-east-2.elasticbeanstalk.com/*", "http://localhost:*", "https://01jongmin.github.io/Flights/*", "https://api.flights-550.net/*"]);

    rocket_cors::CorsOptions {
        allowed_origins,
        allowed_methods: vec![Method::Get].into_iter().map(From::from).collect(),
        allowed_headers: AllowedHeaders::some(&["Authorization", "Accept"]),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors().expect("Error setting up cors")
}

