import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
// import "./google_map.css";
import { relative } from "path";

export class googleMap extends Component {
  state = { carlocations: [] };
  // componentDidMount() {
  //   fetch("https://eb12rgeux2.execute-api.ap-south-1.amazonaws.com/dev")
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState({ carlocations: data });
  //     });
  // }

  data = [
    { carId: "323124784800", latitude: "37.762391", longitude: "-122.439192" },
    { carId: "3231242535", latitude: "37.338207", longitude: "-121.886330" }
  ];

  render() {
    return (
      <div style={{ position: "absolute", width: "90%", height: "800px" }}>
        <Map google={this.props.google} zoom={14}>
          {this.data.map((item, i) => {
            const obj = { lat: item.latitude, lng: item.longitude };
            return <Marker key={i} position={obj} />;
          })}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCuYrTyt14OYPl-1TjlVkTrX36ZklpEEwo"
})(googleMap);
