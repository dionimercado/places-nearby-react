import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class GoogleMap extends Component {
  state = {
    currentPos: {
      lat: 40,
      lng: -88
    },
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(position =>
      this.setState({
        currentPos: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    );
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    console.log("props", props);
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const google = this.props.google;
    console.log("places", this.props);
    return (
      <Map
        google={google}
        style={{ width: "75%", height: "100%" }}
        center={this.state.currentPos}
        zoom={15}
        onClick={this.onMapClicked}
      >
        <Marker
          onClick={this.onMarkerClick}
          position={this.state.currentPos}
          name={"Current location"}
        />

        {this.props.places.map(place => (
          <Marker
            key={place.id}
            onClick={this.onMarkerClick}
            position={place.geometry.location}
            name={place.name}
            address={place.vicinity}
            placeid={place.place_id}
            icon={{
              url: "/restaurant.png",
              anchor: new google.maps.Point(32, 32),
              scaledSize: new google.maps.Size(32, 32)
            }}
          />
        ))}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
            <p>{this.state.selectedPlace.address}</p>
            <button
              onClick={() =>
                this.props.linkTo(`/${this.state.selectedPlace.placeid}`)
              }
              className="btn btn-info"
            >
              More Info
            </button>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBOmxUJzDrJvFM2ke39fTQe0tZdGcLh3Vk"
})(GoogleMap);
