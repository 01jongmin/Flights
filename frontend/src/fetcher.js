import config from "./config.json";

const getAllMatches = async (page, pagesize, league) => {
  //var res = await fetch(
  //`http://${config.server_host}:${config.server_port}/matches/${league}?page=${page}&pagesize=${pagesize}`,
  //{
  //method: "GET",
  //}
  //);
  return {};
};

const getAllPlayers = async (page, pagesize) => {
  return {};
};

const getMatch = async (id) => {
  return {};
};

const getPlayer = async (id) => {
  return {};
};

const getMatchSearch = async (home, away, page, pagesize) => {
  return {};
};

const getPlayerSearch = async (
  name,
  nationality,
  club,
  rating_high,
  rating_low,
  pot_high,
  pot_low,
  page,
  pagesize
) => {
  return {};
};

export {
  getAllMatches,
  getAllPlayers,
  getMatch,
  getPlayer,
  getMatchSearch,
  getPlayerSearch,
};