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
          latitude: "37.338207",
          longitude: "-121.886330"
        }
      }
    });
    // this.interval = setInterval(() => {
    //   this.setState({
    //     data: {
    //       destination: {
    //         latitude: "37.362312",
    //         longitude: "-121.982705"
    //       }
    //     }
    //   });
    // }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeState(e) {
    e.preventDefault();
    this.setState({
      data: {
        destination: {
          latitude: "37.362312",
          longitude: "-121.982705"
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
        <div>
          <DirectionsComponents latitude={this.state.data} />
        </div>
      </div>
    );
  }
}
export default googleMapComponent;
