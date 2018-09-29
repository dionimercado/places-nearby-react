import React, { Component } from "react";
import PlaceDetails from "../components/PlaceDetails";
import Reviews from "../components/Reviews";

import gmaps from "@google/maps";

const googleMapsClient = gmaps.createClient({
  key: "AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs"
});

export default class Place extends Component {
  state = {
    loadingPlaces: true,
    place: {},
    reviews: []
  };

  addReview = data => {
    this.setState({ reviews: [data, ...this.state.reviews] });
  };

  componentDidMount = () => {
    console.log("place_id:", this.props.match.params.place_id);
    googleMapsClient.place(
      {
        placeid: this.props.match.params.place_id
      },
      (err, response) => {
        if (!err) {
          this.setState({
            loadingPlace: false,
            place: response.json.result,
            reviews: response.json.result.reviews
          });
        } else {
          console.log("Error:", err);
        }
      }
    );
  };

  render() {
    // console.log("Obj", Object.values(Obj[4]));
    return (
      <div className="d-flex mt-5 pt-5">
        <div className="w-75 place-details">
          <PlaceDetails place={this.state.place} />
        </div>
        <div className="w-25">
          <Reviews addReview={this.addReview} reviews={this.state.reviews} />
        </div>
      </div>
    );
  }
}
