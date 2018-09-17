import React from "react";
import StarRatings from "react-star-ratings";

const Reviews = ({ reviews }) => {
  console.log("reviews", reviews);
  return (
    <div
      className="bg-light border-left px-4 pt-2 pb-5 position-fixed h-100 w-25"
      style={{ top: 0, right: 0, zIndex: 9999 }}
    >
      <div className="d-flex justify-content-between pb-3 mb-3 border-bottom">
        <h2>Reviews</h2>
        <button className="btn btn-primary">Add Review</button>
      </div>
      <div style={{ overflow: "scroll" }} className="h-100">
        {reviews.map(review => (
          <div key={review.time} className="card mb-3">
            <div className="card-body">
              <div className="mb-4">
                <div className="float-left mr-3">
                  <img
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    width="60"
                    height="60"
                  />
                </div>
                <h5 className="card-title mb-0">{review.author_name}</h5>
                <StarRatings
                  rating={review.rating}
                  starRatedColor="orange"
                  starDimension="20px"
                  starSpacing="-5px"
                />
              </div>
              <p className="card-text">{review.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
