import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import gmaps from "@google/maps";
import Header from "./components/Header";
import Place from "./components/Place";
import Main from "./components/Main";
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
        <Router>
          <div>
            <Header brand="Restaurant Reviews" />
            <Route
              exact
              path="/"
              render={() => <Main places={this.state.places} />}
            />
            <Route path="/:place_id" component={Place} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
