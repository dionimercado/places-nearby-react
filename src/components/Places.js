import React from "react";
import StarRatings from "react-star-ratings";

const Places = ({ data }) => (
  <ul className="list-group">
    <li className="list-group-item active rounded-0">Nearby Places</li>
    {data.map(place => (
      <li key={place.id} className="list-group-item">
        <h4>{place.name}</h4>
        <div>
          <span className="badge badge-secondary mr-3">
            {(place.rating * 1).toFixed(1)}
          </span>
          <StarRatings
            rating={place.rating}
            numberOfStars={5}
            starRatedColor="orange"
            starDimension="20px"
            starSpacing="5px"
          />
        </div>
      </li>
    ))}
  </ul>
);

export default Places;
