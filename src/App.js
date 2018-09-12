import React, { Component } from "react";
import Header from "./components/Header";
import Places from "./components/Places";
import Map from "./components/Map";
import "./App.css";

class App extends Component {
  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(position =>
      console.log("My position is:", position)
    );
  };

  render() {
    return (
      <div className="App">
        <Header brand="Restaurant Reviews" />
        <div className="d-flex">
          <div className="w-75">
            <Map />
          </div>
          <div className="w-25">
            <Places />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
