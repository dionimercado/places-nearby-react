import React from "react";
import StarRatings from "react-star-ratings";

const Header = ({ brand, filter, changeFilter }) => (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top p-0">
    <div className="navbar-brand p-3">{brand}</div>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarsExampleDefault"
      aria-controls="navbarsExampleDefault"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    {!!changeFilter && (
      <div
        className="navbar-nav ml-auto bg-primary w-25 d-flex justify-content-between align-items-center px-3"
        style={{ height: "62px" }}
      >
        <h5 className="mb-0 text-white">Nearby Restaurants</h5>
        <span>
          <StarRatings
            rating={filter}
            changeRating={changeFilter}
            starEmptyColor="white"
            starRatedColor="organge"
            starHoverColor="orange"
            starDimension="20px"
            starSpacing="-5px"
          />
        </span>
      </div>
    )}
  </nav>
);

export default Header;
