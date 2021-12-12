import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import About from "./About";
import PlayerPage from "./pages/PlayersPage.js";
import MatchPage from "./pages/MatchesPage.js";
import Home from "./pages/HomePage.js";
import AlliancesPage from "./pages/AlliancesPage";
import AirportsPage from "./pages/AirportsPage";


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
          <Route exact path="/airports">
            <AirportsPage />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
