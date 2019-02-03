import React from "react";
import DirectionsComponents from "./googleMapRoute";

class googleMapComponent extends React.Component {
  state = { data: {} };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.setState({
      data: {
        destination: {
          latitude: "37.759703",
          longitude: "-130.428093"
        }
      }
    });
  }
  render() {
    return <DirectionsComponents latitude={this.state.data} />;
  }
}
export default googleMapComponent;
