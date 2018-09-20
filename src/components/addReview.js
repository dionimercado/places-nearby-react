import React, { Component } from "react";
import StarRatings from "react-star-ratings";

export default class AddReview extends Component {
  state = {
    profile_photo_url: "/no-avatar.png",
    rating: 0,
    author_name: "Dioni M",
    text: "My personal comment...",
    time: Date.now()
  };

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={this.state.author_name}
              onChange={e => this.setState({ author_name: e.target.value })}
            />
          </div>
          <StarRatings
            rating={this.state.rating}
            changeRating={rating => this.setState({ rating })}
            starRatedColor="orange"
            starDimension="20px"
            starSpacing="-5px"
          />
          <div className="form-group">
            <label htmlFor="comments">Comments</label>
            <textarea
              name="comments"
              id="comments"
              className="form-control"
              value={this.state.text}
              onChange={e => this.setState({ text: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={e => {
              e.preventDefault();
              this.props.addReview(this.state);
            }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
