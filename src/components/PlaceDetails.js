import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const PlaceDetails = ({ place, params }) => {
  const photos = place.photos;
  const photoReferences = [];

  for (let photo in photos) {
    // console.log("photo", photos[photo].photo_reference);
    photoReferences.push(photos[photo].photo_reference);
  }

  console.log(photoReferences);

  console.log("place", JSON.stringify(photos));
  return (
    <div className="container">
      <Link
        className="btn btn-success position-absolute"
        style={{ left: 15, top: 90 }}
        to="/"
      >
        Go back
      </Link>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div>
            <header className="d-flex">
              <div className="w-75 position-relative">
                <img
                  className="img-fluid w-100"
                  src={`https://maps.googleapis.com/maps/api/streetview?location=${
                    params.lat
                  },${
                    params.lng
                  }&size=600x400&key=AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs`}
                  alt={place.name}
                />
                <div
                  className="p-4 w-100 position-absolute p-3"
                  style={{
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(0,0,0,.7)",
                    color: "white"
                  }}
                >
                  <h5>Address</h5>
                  <p>{place.formatted_address}</p>
                  <h5>Phone</h5>
                  <p>{place.formatted_phone_number}</p>
                </div>
              </div>
              <div className="w-25">
                <img
                  className="img-fluid w-100"
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${
                    place.formatted_address
                  }&zoom=12&size=230x460&key=AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs`}
                  alt={place.name}
                />
              </div>
            </header>
          </div>
          <div className="d-flex justify-content-between border px-3 bg-info text-white">
            <h2 className="my-1">{place.name}</h2>
            <div className="mt-2">
              <StarRatings
                rating={place.rating}
                starRatedColor="white"
                starDimension="20px"
                starSpacing="-5px"
              />
            </div>
          </div>

          <div className="row p-3">
            {photoReferences.splice(0, 8).map(photo => (
              <div
                className="col-md-3 image-block"
                style={{
                  backgroundSize: "cover",
                  background: `url(
                  https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs
                ) center center no-repeat`
                }}
              >
                <a
                  style={{ width: "100%", height: "100%", display: "block" }}
                  href={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photoreference=${photo}&key=AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs`}
                  data-fancybox="gallery"
                >
                  {/* <img
                    className="w-100"
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs`}
                  /> */}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
