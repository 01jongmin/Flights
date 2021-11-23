import logo from "./logo.svg";
import "./App.css";
import React from "react";

function App() {
  React.useEffect(async () => {
    async function fetchMyAPI() {
      var res = await fetch(`https://flights.onrender.com/world`, {
        method: "GET",
      });
      console.log(res);
    }

    fetchMyAPI();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
