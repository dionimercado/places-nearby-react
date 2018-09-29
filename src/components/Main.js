import React, { Component } from "react";
import Places from "./Places";
import Map from "./Map";

class Main extends Component {
  linkTo = path => {
    console.log(path);
    this.props.history.push(path);
  };
  render() {
    return (
      <div className="d-flex">
        <div className="w-75">
          <Map places={this.props.places} linkTo={this.linkTo} />
        </div>
        <div className="w-25 pt-5">
          <Places data={this.props.places} />
        </div>
      </div>
    );
  }
}

export default Main;
