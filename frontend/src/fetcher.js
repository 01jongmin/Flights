import config from "./config.json";

var prefix = 'https://api.flights-550.net'

const getAlliances = async () => {
  var res = await fetch(`https://api.flights-550.net/alliances/`, {
    method: "GET",
  });
  return res.json();
};

const getAirlinesFromAlliance = async (allianceName, pagesize, page) => {
  var res = await fetch(`${prefix}/alliances/${allianceName}/airlines?page_size=${pagesize}&page=${page}/`, {
    method: "GET",
  });
  return res.json();
}

const getAirportsFromAlliance = async (allianceName) => {
  var res = await fetch(`${prefix}/alliances/${allianceName}/airports`, {
    method: "GET",
  });
  return res.json();
}

const getCountries = async () => { 
  var res = await fetch(`${prefix}/countries/`, {
    method: "GET",
  });
  return res.json();
}

const getDestinationsFromCountry = async (country) => {
  var res = await fetch(`${prefix}/countries/destinations?country_name=country`, {
    method: "GET",
  });
  return res.json();
}

const getCountryFromCountryCode = async(countryCode) => { 
  var res = await fetch(`https://api.flights-550.net/countries/${countryCode}`, {
    method: "GET",
  });
  return res.json();
}

const getPlanes = async () => {
  var res = await fetch(`${prefix}/planes/`, {
    method: "GET",
  });
  return res.json();
}

const getRoutesFromPlane = async (model_name) => {
  var res = await fetch(`${prefix}/planes/routes?model_name=${model_name}`, {
    method: "GET",
  });
  return res.json();
}

const getAirports = async (page, pagesize) => {
  var res = await fetch(`${prefix}/airports/?page_size=${pagesize}&page=${page}`, {
    method: "GET",
  });
  return res.json();
}


export { getAlliances,
getAirlinesFromAlliance,
getAirportsFromAlliance, 
getCountries,
getDestinationsFromCountry,
getPlanes,
getRoutesFromPlane,
getAirports,
getCountryFromCountryCode
 };
