table! {
    AirlineAlliances (airline, alliance) {
        airline -> Integer,
        alliance -> Char,
    }
}

table! {
    Airlines (id) {
        id -> Integer,
        name -> Varchar,
        alias -> Nullable<Varchar>,
        iata -> Char,
        icao -> Nullable<Char>,
        callsign -> Nullable<Varchar>,
        active -> Nullable<Char>,
    }
}

table! {
    Airports (id) {
        id -> Integer,
        name -> Char,
        city -> Nullable<Varchar>,
        country -> Char,
        iata -> Nullable<Char>,
        icao -> Nullable<Char>,
        lat -> Nullable<Double>,
        lon -> Nullable<Double>,
        alt -> Nullable<Integer>,
        timezone -> Nullable<Double>,
        dst -> Nullable<Char>,
        tz -> Nullable<Varchar>,
    }
}

table! {
    Alliances (id) {
        id -> Char,
        name -> Varchar,
        image -> Varchar,
    }
}

table! {
    Countries (iso_code) {
        name -> Varchar,
        iso_code -> Char,
    }
}

table! {
    CountryAliases (country, name) {
        country -> Char,
        name -> Varchar,
    }
}

table! {
    Landmarks (id) {
        id -> Integer,
        name -> Varchar,
        lat -> Decimal,
        lon -> Decimal,
        imageUrl -> Varchar,
        country -> Char,
    }
}

table! {
    Planes (iata, icao) {
        iata -> Char,
        icao -> Char,
        name -> Varchar,
    }
}

table! {
    Routes (id) {
        id -> Integer,
        airline_id -> Integer,
        source_id -> Integer,
        target_id -> Integer,
        plane_id -> Nullable<Char>,
    }
}

table! {
    Weather (station_id, date) {
        station_id -> Integer,
        date -> Date,
        temp -> Nullable<Double>,
    }
}

table! {
    WeatherStation (id) {
        id -> Integer,
        lat -> Decimal,
        lon -> Decimal,
        country -> Char,
    }
}

table! {
    posts (id) {
        id -> Unsigned<Bigint>,
        title -> Varchar,
        body -> Varchar,
        published -> Bool,
    }
}

joinable!(AirlineAlliances -> Airlines (airline));
joinable!(AirlineAlliances -> Alliances (alliance));
joinable!(Airports -> Countries (country));
joinable!(CountryAliases -> Countries (country));
joinable!(Landmarks -> Countries (country));
joinable!(Routes -> Airlines (airline_id));
joinable!(Weather -> WeatherStation (station_id));
joinable!(WeatherStation -> Countries (country));

allow_tables_to_appear_in_same_query!(
    AirlineAlliances,
    Airlines,
    Airports,
    Alliances,
    Countries,
    CountryAliases,
    Landmarks,
    Planes,
    Routes,
    Weather,
    WeatherStation,
    posts,
);
