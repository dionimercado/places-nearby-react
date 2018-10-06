import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import gmaps from "@google/maps";

const googleMapsClient = gmaps.createClient({
  key: "AIzaSyBOmxUJzDrJvFM2ke39fTQe0tZdGcLh3Vk"
});

export default class componentName extends Component {
  state = {
    place: {
      reviews: []
    }
  };

  componentDidMount = () => {
    googleMapsClient.place(
      {
        placeid: this.props.match.params.place_id
      },
      (err, response) => {
        if (!err) {
          this.setState({ place: response.json.result });
        } else {
          console.log("Error:", err);
        }
      }
    );
  };

  render() {
    const { place } = this.state;

    console.log("place", place);

    let photos = [];
    for (let photo in place.photos) {
      photos.push(place.photos[photo].photo_reference);
    }

    return (
      <div className="container-fluid mt-5 pt-5">
        <div className="row">
          <div className="col-8">
            <img
              src="https://maps.googleapis.com/maps/api/streetview?location=41.403609,2.174448&size=456x456&key=AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs"
              alt=""
            />
            <h2>{place.name}</h2>
            <div className="row">
              {photos.map(photo => (
                <div className="col-3">
                  <img
                    className="img-fluid"
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=AIzaSyBOmxUJzDrJvFM2ke39fTQe0tZdGcLh3Vk`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <ul className="list-group">
              {place.reviews.map(review => (
                <li key={review.time} className="list-group-item">
                  <div>
                    <img
                      height="60"
                      className="float-left mr-3 mb-4"
                      src={review.profile_photo_url}
                      alt={review.author_name}
                    />
                    <h4 className="mb-0">{review.author_name}</h4>
                    <p className="mb-0">{review.relative_time_description}</p>
                    <StarRatings
                      rating={review.rating}
                      numberOfStars={5}
                      starRatedColor="orange"
                      starDimension="20px"
                      starSpacing="1px"
                    />
                  </div>
                  <br />
                  <div>
                    <p>{review.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
