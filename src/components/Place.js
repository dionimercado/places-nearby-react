import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import gmaps from "@google/maps";
import AddReviewForm from "./AddReview";

const googleMapsClient = gmaps.createClient({
  key: "AIzaSyBOmxUJzDrJvFM2ke39fTQe0tZdGcLh3Vk"
});

export default class componentName extends Component {
  state = {
    place: {
      opening_hours: { weekday_text: [] }
    },
    reviews: [],
    addingReview: false
  };

  componentDidMount = () => {
    googleMapsClient.place(
      {
        placeid: this.props.match.params.place_id
      },
      (err, response) => {
        if (!err) {
          this.setState({
            place: response.json.result,
            reviews: response.json.result.reviews
          });
        } else {
          console.log("Error:", err);
        }
      }
    );
  };

  addReview = data => {
    console.log(data);
    this.setState({ reviews: [data, ...this.state.reviews] });
  };

  render() {
    const { place, reviews } = this.state;

    console.log(place);

    const { lat, lng } = this.props.match.params;
    // const location = {lat:"", lng: ""};
    // for (let geo in place.geometry) {
    //   lat = place.geometry[geo].lat;
    //   lng = place.geometry[geo].lng;
    // }
    console.log("latLng", lat, lng);
    // console.log("opening_hours.weekday_text", place.opening_hours.weekday_text);

    let photos = [];
    for (let photo in place.photos) {
      photos.push(place.photos[photo].photo_reference);
    }

    const hours = place.opening_hours.weekday_text.map((item, key) => (
      <li key={key}>{item}</li>
    ));

    return (
      <div className="container-fluid mt-5 pt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <img
                  className="w-100"
                  src={`https://maps.googleapis.com/maps/api/streetview?location=${lat},${lng}&size=456x459&key=AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs`}
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div
                  className="mt-3 mt-md-0"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gridTemplateRows: "repeat(3, 1fr)",
                    height: "100%",
                    minHeight: "300px"
                  }}
                >
                  {photos.splice(0, 9).map(photo => (
                    <a
                      href={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=AIzaSyBOmxUJzDrJvFM2ke39fTQe0tZdGcLh3Vk`}
                      key={photo}
                      className="place-gallery"
                      style={{
                        background: `url('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=AIzaSyBOmxUJzDrJvFM2ke39fTQe0tZdGcLh3Vk') center center no-repeat`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-info p-3 mt-4">
              <h2 className="text-white d-flex justify-content-between">
                {place.name}
                <StarRatings
                  rating={place.rating}
                  numberOfStars={5}
                  starRatedColor="orange"
                  starDimension="20px"
                  starSpacing="1px"
                />
              </h2>
              <hr />
              <p className="text-black-50">{place.formatted_address}</p>
              <p className="text-black-50">{place.formatted_phone_number}</p>
              <div
                className="p-4"
                style={{
                  backgroundColor: "rgba(255,255,255,.2)",
                  display: "inline-block"
                }}
              >
                <h3 className="text-white">Opening Hours</h3>
                <ul className="m-0 p-0" style={{ listStyle: "none" }}>
                  {hours}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-primary"
              onClick={() =>
                this.setState({ addingReview: !this.state.addingReview })
              }
            >
              {this.state.addingReview ? "Cancel" : "Add Review"}
            </button>
            {this.state.addingReview && (
              <AddReviewForm submit={this.addReview} />
            )}
            <ul className="list-group">
              {reviews.map(review => (
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
