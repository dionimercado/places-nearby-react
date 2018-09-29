import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";

export class GoogleMaps extends Component {
  state = {
    initialCenter: {
      lat: 42,
      lng: -71
    },
    currentPos: {},
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        initialCenter: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        currentPos: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    });
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ initialCenter: nextProps.reCenter });
  };

  onReady = map => {
    // console.log("map loaded", map);
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const { google } = this.props;
    return (
      <div>
        <Map
          onReady={this.onReady}
          google={this.props.google}
          center={this.state.initialCenter}
        >
          {this.props.places.map(place => {
            // console.log("mapPlaces", this.state);
            // console.log("place:", place.opening_hours);
            return (
              <Marker
                key={place.id}
                onClick={this.onMarkerClick}
                name={place.name}
                address={place.vicinity}
                place_id={place.place_id}
                is_open={
                  place.opening_hours ? place.opening_hours.open_now : false
                }
                position={place.geometry.location}
                icon={{
                  url:
                    "http://maps.google.com/mapfiles/ms/icons/restaurant.png",
                  anchor: new google.maps.Point(24, 24),
                  scaledSize: new google.maps.Size(32, 32)
                }}
              />
            );
          })}
          <Marker
            title="imhere"
            onClick={this.onMarkerClick}
            name={"My position"}
            position={this.state.currentPos}
            icon={{
              url: "http://plebeosaur.us/etc/map/bluedot_retina.png"
            }}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>
                {this.state.selectedPlace.name}{" "}
                {this.state.selectedPlace.is_open ? (
                  <small className="text-success">Open</small>
                ) : (
                  <small className="text-danger">Closed</small>
                )}
              </h1>
              <p>{this.state.selectedPlace.address}</p>
              <a
                href={`/${this.state.selectedPlace.place_id}`}
                className="btn btn-success"
              >
                See place
              </a>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs"
})(GoogleMaps);

// const Map = () => (
//   <iframe
//     title="Map"
//     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23447.846315940275!2d-71.18049836487936!3d42.725297332972765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e307773d37c907%3A0x39c0929950656fb!2sSunnyside+Diner!5e0!3m2!1sen!2sus!4v1536421407549"
//     frameBorder="0"
//     style={{ border: 0, width: "100%", height: "100vh" }}
//     allowFullScreen
//   />
// );

// export default Map;
