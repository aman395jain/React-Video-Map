/*global google*/
import React, { Component } from "react";
import { compose, withProps, lifecycle, withState } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
import { func } from "prop-types";

class DirectionsComponents extends Component {
  state = {};
  constructor(props) {
    super(props);
  }

  render() {
    const source = {
      place: "San Macisco",
      latitude: "37.762391",
      longitude: "-122.439192"
    };
    const destinations = [
      {
        city: "San Jone",
        latitude: "37.338207",
        longitude: "-121.886330"
      },
      {
        city: "Mountain View",
        latitude: "37.386051",
        longitude: "-122.083855"
      },
      {
        city: "Redwood City",
        latitude: "37.485214",
        longitude: "-122.236359"
      },
      {
        city: "San Mateo",
        latitude: "37.562992",
        longitude: "-122.325523"
      },
      {
        city: "San Macisco",
        latitude: "37.762391",
        longitude: "-122.439192"
      }
    ];
    function getObj(destinationPath) {
      let i = -1;
      return function() {
        i++;
        if (i > 4) {
          return false;
        }
        const destination = {
          latitude: destinationPath[i].latitude,
          longitude: destinationPath[i].longitude
        };
        this.destCord = destination;
        console.log(this.destCord);
        return destination;
      };
    }
    const DirectionsComponent = compose(
      withProps({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAQoP1pA_88qyn368YD5N2i1tuA6eWhqX0&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `400px` }} />,
        containerElement: <div style={{ width: `90%` }} />,
        mapElement: <div style={{ height: `500px`, width: `600px` }} />
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() {
          const data = {
            destination: {
              place: "San Jose",
              latitude: "37.562992",
              longitude: "-122.325523"
            }
          };

          //   setInterval(() => {
          //     getObj(destinations);
          //   }, 2000);
          const destCord = { latitude: "37.562992", longitude: "-122.325523" };
          setInterval(getObj(destinations).bind(destCord), 2000);
          console.log(destCord);

          const DirectionsService = new google.maps.DirectionsService();
          DirectionsService.route(
            {
              origin: new google.maps.LatLng(source.latitude, source.longitude),
              destination: new google.maps.LatLng(
                destCord.latitude,
                destCord.longitude
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
    )(props => (
      <GoogleMap defaultZoom={11}>
        {
          <DirectionsRenderer
            directions={props.directions}
            suppressMarkers={props.markers}
          />
        }
      </GoogleMap>
    ));

    return <DirectionsComponent />;
  }
}

export default DirectionsComponents;
