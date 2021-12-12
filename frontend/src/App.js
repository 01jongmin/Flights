import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import About from "./About";
import PlayerPage from "./pages/PlayersPage.js";
import Home from "./pages/HomePage.js";

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
        </Switch>
      </div>
    );
  }
}

export default App;
