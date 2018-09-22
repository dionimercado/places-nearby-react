import React, { Component } from "react";
import gmaps from "@google/maps";
import Header from "./components/Header";
import Places from "./components/Places";
import Map from "./components/Map";
import "./App.css";

const googleMapsClient = gmaps.createClient({
  key: "AIzaSyBOmxUJzDrJvFM2ke39fTQe0tZdGcLh3Vk"
});

class App extends Component {
  state = {
    places: []
  };

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log("My position is:", position);
      googleMapsClient.placesNearby(
        {
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          radius: 5000,
          type: "restaurant"
        },
        (err, response) => {
          if (!err) {
            this.setState({ places: response.json.results });
          } else {
            console.log("Error:", err);
          }
        }
      );
    });
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
            <Places data={this.state.places} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
