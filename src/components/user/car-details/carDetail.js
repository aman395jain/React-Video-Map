import React, { Component } from "react";
import "./carDetail.scss";
import LatiLognDetails from "../lati-long-details/latiLongDetails";
import MapDetails from "../map-details/mapDetails";
import CarVideo from "../car-video/CarVideo";
import DonutChart from "./../charts/donut-chart/donut_Chart";
import BarChart from "./../charts/barChart-chart2/barChart";
import LineChart from "./../charts/line-chart/lineChart";
import GoogleMapComponent from "./../Google-Map/googleMapRoute";
import axios from "axios";
import _ from "lodash";
import Modal from "../forms/modalForm";

class CarDetail extends Component {
  state = {
    url:
      "https://www.totaleclips.com/Player/Bounce.aspx?eclipid=e108119&bitrateid=449&vendorid=102&type=.mp4",
    responseFlag: false
  };
  constructor(props) {
    super(props);

    this.state = {
      latlng: {},
      cardata: {},
      accidentData: {},
      //videoUrl:"https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
      videoJsOptions: {
        autoplay: false,
        controls: true,
        sources: [
          {
            src:
              "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
            type: "application/x-mpegURL"
          }
        ]
      }
    };
    const id = props.match.params.vin;
    //this.updateVideo("carvin121212_cam1");
    this.setLatLng = this.setLatLng.bind(this);
    this.setRoutes = this.setRoutes.bind(this);
    this.updateVideo = this.updateVideo.bind(this);
  }
  componentDidMount() {
    //console.log(componentDidMount)

    axios
      .post(
        "https://skloa3avwj.execute-api.us-east-1.amazonaws.com/prototype",
        {
          vin: this.props.match.params.vin
        }
      )
      .then(response => {
        console.log("data", response.data);
        if (
          response &&
          response.data &&
          typeof response.data.message === "undefined"
        ) {
          this.setState({ responseFlag: true });
          this.setState({ cardata: response.data });
          this.setState({ accidentData: response.data.accidentFlagData[0] });
          //this.setState({ camdata : response.data.cardata })
          this.updateVideo("carvin121212_cam1");
        } else {
          this.refs.modalform.onOpenModal(this.props.match.params.vin);
        }
      })
      .catch(err => {
        console.log("err" + err);
      });
  }

  setLatLng(e) {
    //console.log("setlatlng" ,e);
    this.setState({
      latlng: { lat: e.lat().toFixed(6), lng: e.lng().toFixed(6) }
    });
    //console.log(this.state.latlng);
  }

  updateVideo(camName) {
    if (this.state.cardata) {
      console.log(
        "this.state.cardata.streamData",
        this.state.cardata.streamData
      );
      // let videodetails = [];
      let videodetails = _.filter(
        this.state.cardata.streamData,
        item => item.name == camName
      ).map(item => {
        return { url: item.url };
      });
      this.setState({
        videoJsOptions: {
          autoplay: false,
          controls: true,
          sources: [
            {
              src: videodetails.length > 0 ? videodetails[0].url : ""
              //type: "application/x-mpegURL"
            }
          ]
        }
      });
      console.log("this.videoJsOptions", this.state.videoJsOptions);
    }
  }
  setRoutes() {
    this.refs.googleMap.setRoutes();
  }
  render() {
    return this.state.responseFlag ? (
      <div className="car-details">
        <div className="container">
          <div className="row ">
            <div className="col-12 d-flex">
              <div className="car-image">
                <span className="sensor pos-1" />
                <span className="sensor pos-2" />
                {/* <span className="sensor pos-3" onClick={this.updateVideo(cardata[0].cam1)} />
                <span className="sensor pos-4" onClick={this.updateVideo(cardata[0].cam2)} /> */}
                <span className="sensor pos-5" />
                <span className="sensor pos-6" />
              </div>
              <div className="car-video">
                <div className="car-id">{this.props.match.params.vin}</div>
                <CarVideo videoOptions={this.state.videoJsOptions} />
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{ marginTop: "34px", minHeight: "100px" }}
          >
            <div className="col-12 d-flex p-0">
              <button onClick={this.setRoutes}>click me....</button>
              {/* <button onClick={this.refs.googleMap.stopMovement}>stop....</button>
            <button onClick={this.refs.googleMap.startMovement}>start....</button> */}
            </div>
          </div>
          <div className="row" style={{ marginTop: "34px", width: "1149px" }}>
            <div className="col-12 d-flex p-0">
              <LatiLognDetails
                latlng={this.state.latlng}
                accidentData={this.state.accidentData}
              />
              <GoogleMapComponent
                ref="googleMap"
                setLatLng={this.setLatLng}
                Cardetails={this.state.cardata}
              />
            </div>
          </div>
          <div className="row charts" style={{ marginTop: "18px" }}>
            <div className="col-2 donutChart">
              <DonutChart />
            </div>
            <div className="col-2 barChart">
              <BarChart />
            </div>
            <div className="col-5 lineChart">
              <LineChart />
            </div>
            <div className="col-3" />
          </div>
        </div>
      </div>
    ) : (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center align-middle">vdhchvcdcdvg</div>
          </div>
        </div>
        <Modal ref="modalform" />
      </div>
    );
  }
}

export default CarDetail;
