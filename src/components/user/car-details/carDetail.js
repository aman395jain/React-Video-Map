import React, { Component } from "react";
import "./carDetail.scss";
import LatiLognDetails from "../lati-long-details/latiLongDetails";
import MapDetails from "../map-details/mapDetails";
import CarVideo from "../car-video/CarVideo";
import GoogleMapComponent from "./../Google-Map/googleMapRoute";
import DonutChart from "./../charts/donut-chart/donut_Chart";
import BarChart from "./../charts/barChart-chart2/barChart";
import LineChart from "./../charts/line-chart/lineChart";

class CarDetail extends Component {
  state = {
    url:
      "https://www.totaleclips.com/Player/Bounce.aspx?eclipid=e108119&bitrateid=449&vendorid=102&type=.mp4"
  };
  constructor(props) {
    super(props);

    this.state = { latlng: {} };
    const id = props.match.params.incidentId;
    this.updateVideo(id);
    this.setLatLng = this.setLatLng.bind(this);
  }
  componentDidMount() {
    let controlBar = document.getElementsByClassName("vjs-control-bar");

    //document.getElementById('video-control-div').appendChild(controlBar[0]);
  }

  setLatLng(e) {
    console.log("setlatlng", e);
    this.setState({
      latlng: { lat: e.lat().toFixed(6), lng: e.lng().toFixed(6) }
    });

    console.log(this.state.latlng);
  }

  updateVideo(id) {
    console.log("carDetails", id);
    // fetch video on the basis of id eg. INC00000000098

    if (id === "INC00000000098") {
      console.log("iffff");
      this.videoJsOptions = {
        autoplay: false,
        controls: true,
        sources: [
          {
            src:
              "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
            type: "application/x-mpegURL"
          }
        ]
      };
    } else {
      console.log("else");
      this.videoJsOptions = {
        autoplay: false,
        controls: true,
        sources: [
          {
            src: this.state.url,
            type: "video/mp4"
          }
        ]
      };
    }
  }

  render() {
    return (
      <div className="car-details">
        <div className="container">
          <div className="row ">
            <div className="col-12 d-flex">
              <div className="car-image">
                <span className="sensor pos-1" />
                <span className="sensor pos-2" />
                <span className="sensor pos-3" />
                <span className="sensor pos-4" />
                <span className="sensor pos-5" />
                <span className="sensor pos-6" />
              </div>
              <div className="car-video">
                <div className="car-id">
                  {this.props.match.params.incidentId}
                </div>
                <CarVideo {...this.videoJsOptions} />
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{ marginTop: "34px", minHeight: "100px" }}
          >
            <div className="col-12 d-flex p-0" id="video-control-div" />
          </div>
          <div className="row" style={{ marginTop: "34px" }}>
            <div className="col-12 d-flex p-0">
              <LatiLognDetails latlng={this.state.latlng} />
              <GoogleMapComponent setLatLng={this.setLatLng} />
            </div>
          </div>
          <div className="row charts" style={{ marginTop: "18px" }}>
            <div className="col-3 donut">
              <DonutChart />
            </div>
            <div className="col-3 barChart">
              <BarChart />
            </div>
            <div className="col-4 lineChart">{/* <LineChart /> */}</div>
            <div className="col-2">gsssj</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CarDetail;
