import React from "react";
import DirectionsComponents from "./googleMapRoute";

class googleMapComponent extends React.Component {
  state = { data: {} };
  constructor(props) {
    super(props);
    this.changeState = this.changeState.bind(this);
  }

  destinations = [
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

  destination = [
    {
      city: "Mountain View",
      latitude: "37.386051",
      longitude: "-122.083855"
    }
  ];

  componentDidMount() {
    this.setState({
      data: {
        destination: {
          latitude: "37.338207",
          longitude: "-121.886330"
        }
      }
    });
    this.destinations.map((destination, i) => {
      // console.log("destination", i);
      // setInterval(
      //   destination => {
      //     console.log("destination", destination);
      //   },
      //   2000,
      //   destination
      // );
      // this.setState({
      //   data: {
      //     destination: {
      //       latitude: destination.latitude,
      //       longitude: destination.longitude
      //     }
      //   }
      // });
    });
    setInterval(this.getObj(this.destinations).bind(this), 2000);
  }
  getObj(destination) {
    let i = -1;
    return function() {
      i++;
      if (i > 4) {
        return false;
      }

      this.setState({
        data: {
          destination: {
            latitude: destination[i].latitude,
            longitude: destination[i].longitude
          }
        }
      });
    };
  }

  changeState(e) {
    e.preventDefault();
    // this.setState({
    //   data: {
    //     destination: {
    //       latitude: "37.362312",
    //       longitude: "-121.982705"
    //     }
    //   }
    // });
    this.destination.map((destination, i) => {
      this.setState({
        data: {
          destination: {
            latitude: destination.latitude,
            longitude: destination.longitude
          }
        }
      });
    });
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={e => this.changeState(e)}>
          clickMe
        </button>
        <br />
        <div style={{ marginTop: 20 }}>
          <DirectionsComponents latitude={this.state.data} />
        </div>
      </div>
    );
  }
}
export default googleMapComponent;
