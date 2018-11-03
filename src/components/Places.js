import React from "react";
import StarRatings from "react-star-ratings";

const Places = ({ data, onChangeRating, filter }) => {
  const places =
    data.length > 0 ? (
      data.map(place => (
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
      ))
    ) : (
      <h2 className="text-center my-5">Nothing found.</h2>
    );
  return (
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
        <h4
          className="mb-0 d-flex justify-content-between"
          style={{ lineHeight: "54px" }}
        >
          <span>Nearby Places</span>
          <StarRatings
            rating={filter}
            numberOfStars={5}
            changeRating={rating => onChangeRating(rating)}
            starRatedColor="orange"
            starDimension="20px"
            starSpacing="3px"
          />
        </h4>
      </li>
      {places}
    </ul>
  );
};

export default Places;
