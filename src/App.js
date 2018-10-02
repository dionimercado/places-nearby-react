import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Place from "./pages/Place";

import "./App.css";

import gmaps from "@google/maps";
const googleMapsClient = gmaps.createClient({
  key: "AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs"
});
// AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs

class App extends Component {
  state = {
    filter: 0,
    places: [],
    filteredPlaces: [],
    currentPlacePos: {},
    currentPos: {}
  };

  onPlaceClick = latlng => {
    this.setState({ currentPlacePos: latlng });
  };

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        currentPos: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });

      googleMapsClient.placesNearby(
        {
          location: position.coords,
          radius: 5000,
          type: "restaurant"
        },
        (err, response) => {
          if (!err) {
            this.setState({
              loadingPlaces: false,
              places: response.json.results
            });
          } else {
            console.log("Error:", err);
          }
        }
      );
    });
  };

  changeFilter = stars => {
    const filteredPlaces = this.state.places.filter(
      place => place.rating >= stars
    );

    this.setState({ filter: stars, filteredPlaces });
  };

  render() {
    const places =
      this.state.filter > 0 ? this.state.filteredPlaces : this.state.places;
    return (
      <div className="App">
        <Router>
          <React.Fragment>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  changeFilter={this.changeFilter}
                  places={places}
                  filter={this.state.filter}
                  currentPos={this.state.currentPos}
                  currentPlacePos={this.state.currentPlacePos}
                  onPlaceClick={this.onPlaceClick}
                />
              )}
            />
            <Route path="/:place_id-:lat-:lng" component={Place} />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
