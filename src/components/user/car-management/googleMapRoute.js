/*global google*/
import React, { Component } from "react";
import { compose, withProps, lifecycle, withState } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";

class DirectionsComponents extends Component {
  //   state = { data: {} };
  constructor(props) {
    super(props);
  }

  render() {
    const DirectionsComponent = compose(
      withProps({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAQoP1pA_88qyn368YD5N2i1tuA6eWhqX0&callback=initMap' ",
        loadingElement: <div style={{ height: `400px` }} />,
        containerElement: <div style={{ width: `100%` }} />,
        mapElement: <div style={{ height: `600px`, width: `600px` }} />
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() {
          console.log(this.props.latitude.latitude.destination.latitude);
          console.log(this.props.latitude.latitude.destination.longitude);
          const data = {
            source: {
              place: "San Macisco",
              latitude: "37.762391",
              longitude: "-122.439192"
            },
            destination: {
              place: "San Jose",
              latitude: this.props.latitude.latitude.destination.latitude,
              longitude: this.props.latitude.latitude.destination.longitude
            }
          };

          const DirectionsService = new google.maps.DirectionsService();
          DirectionsService.route(
            {
              origin: new google.maps.LatLng(
                data.source.latitude,
                data.source.longitude
              ),
              destination: new google.maps.LatLng(
                data.destination.latitude,
                data.destination.longitude
              ),
              travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                  directions: { ...result },
                  markers: true
                });
              } else {
                console.error(`error fetching directions ${result}`);
              }
            }
          );
        }
      })
    )(
      props => (
        console.log(props),
        (
          <GoogleMap defaultZoom={3}>
            {
              <DirectionsRenderer
                directions={props.directions}
                suppressMarkers={props.markers}
              />
            }
          </GoogleMap>
        )
      )
    );

    return <DirectionsComponent latitude={this.props} />;
  }
}

export default DirectionsComponents;
