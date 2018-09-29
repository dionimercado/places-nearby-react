import React, { Component } from "react";
import gmaps from "@google/maps";

const googleMapsClient = gmaps.createClient({
  key: "AIzaSyBOmxUJzDrJvFM2ke39fTQe0tZdGcLh3Vk"
});

export default class componentName extends Component {
  state = {
    place: {}
  };

  componentDidMount = () => {
    googleMapsClient.place(
      {
        placeid: this.props.match.params.place_id
      },
      (err, response) => {
        if (!err) {
          this.setState({ places: response.json.results });
        } else {
          console.log("Error:", err);
        }
      }
    );
  };

  render() {
    return (
      <div>
        <h1>Single place</h1>
      </div>
    );
  }
}
