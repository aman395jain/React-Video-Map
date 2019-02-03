/*global google*/
// import React, { Component } from "react";

// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   DirectionsRenderer
// } from "react-google-maps";

// class testGoogleMap extends Component {
//   state = { directions: {} };
//   data = {
//     source: {
//       place: "San Macisco",
//       latitude: "37.762391",
//       longitude: "-122.439192"
//     },
//     destination: {
//       place: "San Jose",
//       latitude: "37.338207",
//       longitude: "-121.886330"
//     }
//   };
//   componentDidMount() {
//     this.DirectionsService = new google.maps.DirectionsService();
//     this.DirectionsService.route(
//       {
//         origin: new google.maps.LatLng(
//           this.data.source.latitude,
//           this.data.source.longitude
//         ),
//         destination: new google.maps.LatLng(
//           this.data.destination.latitude,
//           this.data.destination.longitude
//         ),
//         travelMode: google.maps.TravelMode.DRIVING
//       },
//       (result, status) => {
//         if (status === google.maps.DirectionsStatus.OK) {
//           this.setState({
//             directions: { ...result },
//             markers: true
//           });
//         } else {
//           console.error(`error fetching directions ${result}`);
//         }
//       }
//     );
//   }

//   render() {
//     console.log(this.state);
//     return (
//       //   <GoogleMap defaultZoom={3}>
//       //     {this.state.directions && (
//       //       <DirectionsRenderer
//       //         directions={this.state.directions}
//       //         suppressMarkers={this.state.markers}
//       //       />
//       //     )}
//       //   </GoogleMap>

//       withScriptjs(withGoogleMap(props => <GoogleMap />))
//     );
//   }
// }

// export default testGoogleMap;

import React, { Component, Fragment } from "react";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from "react-google-maps";

class testGoogleMap extends Component {
  static defaultProps = {
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAQoP1pA_88qyn368YD5N2i1tuA6eWhqX0&v=3.exp&libraries=geometry,drawing,places"
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const data = {
      source: {
        place: "San Macisco",
        latitude: "37.762391",
        longitude: "-122.439192"
      },
      destination: {
        place: "San Jose",
        latitude: "37.338207",
        longitude: "-121.886330"
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

  CMap = withScriptjs(
    withGoogleMap(props => (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 37.762391, lng: -122.439192 }}
      >
        {props.children}
        {
          <DirectionsRenderer
            directions={props.directions}
            suppressMarkers={props.markers}
          />
        }
      </GoogleMap>
      //   <GoogleMap defaultZoom={3}>
      //     {props.directions && (
      //       <DirectionsRenderer
      //         directions={props.directions}
      //         suppressMarkers={props.markers}
      //       />
      //     )}
      //   </GoogleMap>
    ))
  );

  render() {
    console.log(this.state);
    return (
      <Fragment>
        <this.CMap
          googleMapURL={this.props.googleMapURL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `700px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        >
          <Marker position={{ lat: 37.762391, lng: -122.439192 }} />
          <Marker position={{ lat: 37.338207, lng: -121.88633 }} />
        </this.CMap>
      </Fragment>
    );
  }
}

export default testGoogleMap;
