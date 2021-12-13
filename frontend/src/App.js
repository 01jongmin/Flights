import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import About from "./About";
import PlayerPage from "./pages/PlayersPage.js";
import MatchPage from "./pages/MatchesPage.js";
import Home from "./pages/HomePage.js";
import AlliancesPage from "./pages/AlliancesPage";
import AlliancePage from "./pages/AlliancePage";
import AirportsPage from "./pages/AirportsPage";
import RouteSearchPage from "./pages/RouteSearch";
import ReportsPage from "./pages/testmap";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/players">
            <PlayerPage />
          </Route>
          <Route exact path="/alliances">
            <AlliancesPage />
          </Route>
          <Route exact path="/alliance">
            <AlliancePage />
          </Route>
          <Route exact path="/airports">
            <AirportsPage />
          </Route>
          <Route exact path="/routeSearch">
            <RouteSearchPage />
          </Route>
          <Route exact path="/map">
            <ReportsPage />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
