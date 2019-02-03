import React from "react";
import DirectionsComponents from "./googleMapRoute";

class googleMapComponent extends React.Component {
  state = { data: {} };
  constructor(props) {
    super(props);
    this.changeState = this.changeState.bind(this);
  }
  componentDidMount() {
    this.setState({
      data: {
        destination: {
          latitude: "37.759703",
          longitude: "-122.428093"
        }
      }
    });
  }

  changeState(e) {
    e.preventDefault();
    this.setState({
      data: {
        destination: {
          latitude: "37.338207",
          longitude: "-121.886330"
        }
      }
    });
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={e => this.changeState(e)}>
          clickMe
        </button>
        <br />

        <DirectionsComponents latitude={this.state.data} />
      </div>
    );
  }
}
export default googleMapComponent;
