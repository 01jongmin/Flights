import logo from "./logo.svg";
import "./App.css";
import React from "react";

const test = async () => {
  //var res = await fetch(`https://flights.onrender.com/world`, {
    //method: "GET",
  //});
  var res = await fetch(`http://localhost:8000`, {
    method: "GET",
  });
  console.log(res);
};

function App() {
  React.useEffect(() => {
    test().then({});
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
