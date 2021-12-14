import config from "./config.json";

var prefix = "https://api.flights-550.net";

const getAlliances = async () => {
  var res = await fetch(`https://api.flights-550.net/alliances/`, {
    method: "GET",
  });
  return res.json();
};

const getAirlinesFromAlliance = async (allianceName, pagesize, page) => {
  var res = await fetch(
    `${prefix}/alliances/${allianceName}/airlines?page_size=${pagesize}&page=${page}/`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getAirportsFromAlliance = async (allianceName) => {
  var res = await fetch(`${prefix}/alliances/${allianceName}/airports`, {
    method: "GET",
  });
  return res.json();
};

const getCountries = async () => {
  var res = await fetch(`${prefix}/countries/`, {
    method: "GET",
  });
  return res.json();
};

const getPlanespotting = async (countryCode) => {
  var res = await fetch(`https://api.flights-550.net/countries/${countryCode}/manufacturer`, {
    method: "GET",
  });
  return res.json();
};

const getCountriesQuery = async (country) => {
  var res = await fetch(`${prefix}/countries/?name_query=${country}`, {
    method: "GET",
  });

  return new Promise((resolve, reject) => {
    fetch(`${prefix}/countries/?name_query=${country}`)
      .then((response) => response.json())
      .then((res) => {
        resolve(
          res.map(({ name, iso_code }) => ({ value: iso_code, label: name }))
        );
      })
      .catch(reject);
  });
};

const getAirportsFromCountry = async (country, query) => {
  var res = await fetch(`${prefix}/airports/${country}?query=${query}`, {
    method: "GET",
  });
  return new Promise((resolve, reject) => {
    fetch(`${prefix}/airports/${country}?query=${query}`)
      .then((response) => response.json())
      .then((res) => {
        resolve(
          res.map(({ id, name }) => ({ value: id, label: name }))
        );
      })
      .catch(reject);
  });
};

const getAirportsFromCountryStandard = async (country, query) => {
  var res = await fetch(`${prefix}/airports/${country}?query=${query}`, {
    method: "GET",
  });
  return res.json()
};

const getDestinationsFromCountry = async (country) => {
  var res = await fetch(
    `${prefix}/countries/destinations?country_code=${country}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getCountryFromCountryCode = async (countryCode) => {
  var res = await fetch(
    `https://api.flights-550.net/countries/${countryCode}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getLandmarks = async(countryCode) => { 
  var res = await fetch(`https://api.flights-550.net/landmarks/?country_code=${countryCode}`, {
    method: "GET",
  });
  return res.json();
}

const getAirportFromWeather = async (low, high) => {
  var res = await fetch(
    `https://api.flights-550.net/weather/city?low=${low}&high=${high}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getPlanes = async () => {
  var res = await fetch(`${prefix}/planes/`, {
    method: "GET",
  });
  return res.json();
};

const getRoutesFromPlane = async (model_name) => {
  var res = await fetch(`${prefix}/planes/routes?model_name=${model_name}`, {
    method: "GET",
  });
  return res.json();
};

const getAirports = async (page, pagesize) => {
  var res = await fetch(
    `${prefix}/airports/?page_size=${pagesize}&page=${page}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getNumRoutes = async (src, tgt) => {
  var res = await fetch(
    `https://api.flights-550.net/airports/bfs?src_id=${src}&tgt_id=${tgt}&limit=9`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getRoutes = async (src, limit) => {
  var res = await fetch(
    `https://api.flights-550.net/airports/bfs_route?src_id=${src}&limit=${limit}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getAirportsFromId = async (id) => {
  var res = await fetch(
    `https://api.flights-550.net/airports/id/${id}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getRouteFromId = async (id) => {
  var res = await fetch(
    `https://api.flights-550.net/routes/?route_id=${id}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getAirlineFromId = async(id) => {
  var res = await fetch(
    `https://api.flights-550.net/airlines/?airline_id=${id}`,
    {
      method: "GET",
    }
  );
  return res.json();
}

export { getAlliances,
getAirlinesFromAlliance,
getAirportsFromAlliance, 
getCountries,
getCountriesQuery,
getDestinationsFromCountry,
getPlanes,
getRoutesFromPlane,
getAirports,
getCountryFromCountryCode,
getLandmarks,
getAirportFromWeather,
getAirportsFromCountry,
getPlanespotting,
getAirportsFromCountryStandard,
getNumRoutes,
getRoutes,
getAirportsFromId,
getRouteFromId,
getAirlineFromId
 };
