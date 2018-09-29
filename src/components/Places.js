import React from "react";
import StarRatings from "react-star-ratings";

const Places = ({ data }) => (
  <ul
    className="list-group mt-0 pt-2"
    style={{ overflow: "scroll", height: "100vh" }}
  >
    <li
      className="list-group-item active rounded-0 position-fixed w-25"
      style={{
        right: 0,
        top: 0
      }}
    >
      <h4 className="mb-0" style={{ lineHeight: "54px" }}>
        Nearby Places
      </h4>
    </li>
    {data.map(place => (
      <li key={place.id} className="list-group-item">
        <h5>{place.name}</h5>
        <div>
          <span
            className="badge badge-secondary position-relative mr-2"
            style={{ bottom: "-3px" }}
          >
            {(place.rating * 1).toFixed(1)}
          </span>
          <StarRatings
            rating={place.rating}
            numberOfStars={5}
            starRatedColor="orange"
            starDimension="20px"
            starSpacing="3px"
          />
        </div>
      </li>
    ))}
  </ul>
);

export default Places;
