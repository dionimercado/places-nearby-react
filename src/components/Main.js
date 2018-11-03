import React, { Component } from "react";
import Places from "./Places";
import Map from "./Map";

class Main extends Component {
  state = {
    places: [],
    filteredPlaces: [],
    filter: 0
  };

  componentWillUpdate = (nextProps, nextState) => {
    if (nextProps.places !== nextState.places) {
      this.setState({ places: nextProps.places });
    }
  };

  linkTo = path => {
    console.log(path);
    this.props.history.push(path);
  };

  onChangeRating = filter => {
    const places = this.state.places.filter(place => place.rating >= filter);

    console.log("filtered places", places);
    this.setState({ filter, filteredPlaces: places });
  };

  render() {
    return (
      <div className="d-flex">
        <div className="w-75">
          <Map
            newPlace={this.props.newPlace}
            places={
              this.state.filter > 0
                ? this.state.filteredPlaces
                : this.state.places
            }
            linkTo={this.linkTo}
          />
        </div>
        <div className="w-25 pt-5">
          <Places
            data={
              this.state.filter > 0
                ? this.state.filteredPlaces
                : this.state.places
            }
            filter={this.state.filter}
            onChangeRating={this.onChangeRating}
          />
        </div>
      </div>
    );
  }
}

export default Main;
