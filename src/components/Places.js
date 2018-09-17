import React from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
// import gmaps from "@google/maps";

// const googleMapsClient = gmaps.createClient({
//   key: "AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs"
// });

const changeRating = stars => {
  return stars;
};

const filteredPlaces = [];

const Places = ({ places, currentPos, onClick }) => (
  <div className="places-header w-25">
    <ul className="list-group w-100">
      <li className="list-group-item active rounded-0">
        <h4>
          Nearby Restaurants{" "}
          <span className="float-right">
            <StarRatings
              rating={0}
              changeRating={changeRating}
              starDimension="20px"
              starSpacing="-5px"
            />
          </span>
        </h4>
      </li>
    </ul>
    <ul className="list-group places-list w-25">
      {places.map(place => {
        if (place === Math.floor(changeRating())) {
          console.log(place);
        }
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
      })}
    </ul>
  </div>
);

export default Places;
