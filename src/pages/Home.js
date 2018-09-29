import React, { Component } from "react";
import gmaps from "@google/maps";
import Places from "../components/Places";
import Map from "../components/Map";

const googleMapsClient = gmaps.createClient({
  key: "AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs"
});

export default class Home extends Component {
  state = {
    loadingPlaces: true,
    places: [],
    currentPos: {},
    currentPlacePos: {}
  };

  onPlaceClick = latlng => {
    console.log("place latlng", latlng);
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
      // console.log("My position is:", position);
    });
  };

  render() {
    return (
      <div className="d-flex">
        <div className="w-75 gmap">
          <Map
            places={this.state.places}
            reCenter={this.state.currentPlacePos}
          />
        </div>
        <div className="w-25">
          <Places
            places={this.state.places}
            currentPos={this.state.currentPos}
            onClick={this.onPlaceClick}
          />
        </div>
      </div>
    );
  }
}
