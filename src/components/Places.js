import React, { Component } from "react";
import StarRatings from "react-star-ratings";
// import { Link } from "react-router-dom";
// import gmaps from "@google/maps";

// const googleMapsClient = gmaps.createClient({
//   key: "AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs"
// });

class Places extends Component {
  state = {
    filter: 0,
    places: [],
    filteredPlaces: []
  };

  changeFilter = stars => {
    const filteredPlaces = this.state.places.filter(
      place => place.rating >= stars
    );

    console.log("filteredPlaces", filteredPlaces);
    this.setState({ filter: stars, filteredPlaces });
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ places: nextProps.places });
  };

  render() {
    const { onClick } = this.props;

    const places =
      this.state.filter > 0 ? this.state.filteredPlaces : this.state.places;
    console.log("plaaces", places);
    return (
      <div className="places-header w-25">
        <ul className="list-group w-100">
          <li className="list-group-item active rounded-0">
            <h4>
              Nearby Restaurants{" "}
              <span className="float-right">
                <StarRatings
                  rating={this.state.filter}
                  changeRating={this.changeFilter}
                  starEmptyColor="white"
                  starRatedColor="organge"
                  starHoverColor="orange"
                  starDimension="20px"
                  starSpacing="-5px"
                />
              </span>
            </h4>
          </li>
        </ul>
        <ul className="list-group places-list w-25">
          {places.length === 0 ? (
            <h2 className="text-center py-5">No places found</h2>
          ) : (
            places.map(place => {
              return (
                <li key={place.id} className="list-group-item">
                  <button
                    onClick={() => onClick(place.geometry.location)}
                    className="bg-transparent border-0 rounded-0 w-100 text-left"
                  >
                    <div>{place.name}</div>
                    <div>
                      <span className="mr-2">{place.rating}</span>
                      <StarRatings
                        rating={place.rating}
                        starDimension="20px"
                        starSpacing="-5px"
                      />
                    </div>
                  </button>
                  <div>
                    {/* {googleMapsClient.distanceMatrix(
            {
              origins: [currentPos],
              destinations: [place.geometry.location]
            },
            (err, res) => {
              if (!err) {
                <span>{res.json.rows[0].elements[0].distance.text}</span>;
              } else {
                console.log("Distance error:", err);
              }
            }
          )} */}
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    );
  }
}

export default Places;
