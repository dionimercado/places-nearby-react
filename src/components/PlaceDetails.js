import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const PlaceDetails = ({ place }) => {
  // const photos = place.photos;
  // const values = Object.values(place);
  // place.photos.map(photo => console.log("photo", photo));
  // const { lat, lng } = place.geometry.location;
  // const location = place.geometry;
  // console.log(location);

  // place.photos.map(placePhoto => {
  //   var url = placePhoto.getUrl({
  //     maxWidth: 600,
  //     maxHeight: 400
  //   });

  //   console.log("url", url);
  // });

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
              <div className="w-75">
                <img
                  className="img-fluid w-100"
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${
                    place.formatted_address
                  }&zoom=12&size=1200x200&key=AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs`}
                  alt={place.name}
                />
              </div>
              <div className="w-25">
                <div className="bg-light border p-4 h-100">
                  <p>{place.formatted_address}</p>
                  <p>{place.formatted_phone_number}</p>
                </div>
              </div>
            </header>
          </div>
          <div className="d-flex justify-content-between border px-3 mt-4 bg-info text-white">
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

          <div>
            {/* {place.photos.map(photo => (
              <div className="col-md-3">
                <img
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
                    photo.photo_reference
                  }&key=AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs`}
                />
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
