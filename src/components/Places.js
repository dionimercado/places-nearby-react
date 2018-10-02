import React, { Component } from "react";
import StarRatings from "react-star-ratings";
// import { Link } from "react-router-dom";
// import gmaps from "@google/maps";

// const googleMapsClient = gmaps.createClient({
//   key: "AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs"
// });

class Places extends Component {
  state = {
    places: []
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ places: nextProps.places });
  };

  render() {
    const { onClick, places } = this.props;

    return (
      <div className="places-list w-25">
        <ul className="list-group">
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
                  <div />
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
