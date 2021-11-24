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
        lat -> Nullable<Decimal>,
        lon -> Nullable<Decimal>,
        alt -> Nullable<Integer>,
        timezone -> Nullable<Decimal>,
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
    Cities (id) {
        id -> Integer,
        name -> Varchar,
        ascii_name -> Varchar,
        lat -> Decimal,
        lon -> Decimal,
        country -> Char,
        population -> Nullable<Integer>,
    }
}

table! {
    Countries (iso_code) {
        name -> Varchar,
        iso_code -> Char,
    }
}

table! {
    Landmarks (id) {
        id -> Integer,
        name -> Nullable<Varchar>,
        lat -> Nullable<Decimal>,
        lon -> Nullable<Decimal>,
        imageUrl -> Nullable<Varchar>,
        country -> Nullable<Char>,
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
    Weather (city_id, date) {
        city_id -> Integer,
        date -> Date,
        temp -> Nullable<Double>,
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
joinable!(Cities -> Countries (country));
joinable!(Landmarks -> Countries (country));
joinable!(Routes -> Airlines (airline_id));
joinable!(Weather -> Cities (city_id));

allow_tables_to_appear_in_same_query!(
    AirlineAlliances,
    Airlines,
    Airports,
    Alliances,
    Cities,
    Countries,
    Landmarks,
    Planes,
    Routes,
    Weather,
    posts,
);
