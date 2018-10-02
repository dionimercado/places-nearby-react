import React, { Component } from "react";
import Places from "../components/Places";
import Map from "../components/Map";
import Header from "../components/Header";

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Header
          brand="Restaurant Reviews"
          filter={this.props.filter}
          changeFilter={this.props.changeFilter}
        />
        <div className="d-flex">
          <div className="w-75 gmap">
            <Map
              places={this.props.places}
              reCenter={this.props.currentPlacePos}
            />
          </div>
          <div className="w-25">
            <Places
              places={this.props.places}
              currentPos={this.props.currentPos}
              onClick={this.props.onPlaceClick}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
