import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import About from "./About";
import PlayerPage from "./pages/PlayersPage.js";
import MatchPage from "./pages/MatchesPage.js";
import Home from "./pages/HomePage.js";
import AlliancesPage from "./pages/AlliancesPage";
<<<<<<< Updated upstream
=======
import AlliancePage from "./pages/AlliancePage";
import AirportsPage from "./pages/AirportsPage";
import ReportsPage from "./pages/testmap";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
          <Route exact path="/alliance">
            <AlliancePage />
          </Route>
          <Route exact path="/airports">
            <AirportsPage />
          </Route>
          <Route exact path="/map">
            <ReportsPage />
          </Route>
>>>>>>> Stashed changes
        </Switch>
      </div>
    );
  }
}

export default App;
