import config from "./config.json";

const getAlliances = async () => {
  var res = await fetch(`https://api.flights-550.net/alliances/`, {
    method: "GET",
  });
  return res.json();
};

const getAirlinesFromAlliance = async (allianceName, pagesize, page) => {
  var res = await fetch(`http://rocket-env.eba-jzvxeuty.us-east-2.elasticbeanstalk.com/alliances/${allianceName}/airlines?page_size=${pagesize}&page=${page}/`, {
    method: "GET",
  });
  return res.json();
}

const getAirportsFromAlliance = async (allianceName) => {
  var res = await fetch(`http://rocket-env.eba-jzvxeuty.us-east-2.elasticbeanstalk.com/alliances/${allianceName}|/airports`, {
    method: "GET",
  });
  return res.json();
}

const getCountries = async () => { 
  var res = await fetch(`http://rocket-env.eba-jzvxeuty.us-east-2.elasticbeanstalk.com/countries/`, {
    method: "GET",
  });
  return res.json();
}

const getDestinationsFromCountry = async (country) => {
<<<<<<< Updated upstream
  var res = await fetch(`http://rocket-env.eba-jzvxeuty.us-east-2.elasticbeanstalk.com/countries/destinations?country_name=country`, {
=======
  var res = await fetch(`${prefix}/countries/destinations?country_name=${country}`, {
>>>>>>> Stashed changes
    method: "GET",
  });
  return res.json();
}

const getPlanes = async () => {
  var res = await fetch(`http://rocket-env.eba-jzvxeuty.us-east-2.elasticbeanstalk.com/planes/`, {
    method: "GET",
  });
  return res.json();
}

const getRoutesFromPlane = async (model_name) => {
  var res = await fetch(`http://rocket-env.eba-jzvxeuty.us-east-2.elasticbeanstalk.com/planes/routes?model_name=${model_name}`, {
    method: "GET",
  });
  return res.json();
}

const getAirports = async (page, pagesize) => {
  var res = await fetch(`http://rocket-env.eba-jzvxeuty.us-east-2.elasticbeanstalk.com/airports/?page_size=${pagesize}&page=${page}`, {
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
getAirports
 };
