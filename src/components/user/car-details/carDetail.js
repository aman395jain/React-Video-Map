import React, { Component } from "react";
import "./carDetail.scss";
import axios from "axios";
import _ from "lodash";
import Modal from "../forms/modalForm";
import videojs from "video.js";
import { FadeLoader } from "react-spinners";

import LatiLognDetails from "../lati-long-details/latiLongDetails";
import MapDetails from "../map-details/mapDetails";
// import CarVideo from "../car-video/CarVideo";
import DonutChart from "./../charts/donut-chart/donut_Chart";
import BarChart from "./../charts/barChart-chart2/barChart";
import LineChart from "./../charts/line-chart/lineChart";
import GoogleMapComponent from "./../Google-Map/googleMapRoute";

class CarDetail extends Component {
  state = {
    url:
      "https://www.totaleclips.com/Player/Bounce.aspx?eclipid=e108119&bitrateid=449&vendorid=102&type=.mp4",
    responseFlag: false,
    loadingSpinner: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      latlng: {},
      cardata: {},
      accidentData: {},
      //videoUrl:"https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
      controlBar: {
        inputRangeVal: 0
      }
    };
    const id = props.match.params.vin;
    //this.updateVideo("carvin121212_cam1");
    this.setLatLng = this.setLatLng.bind(this);
    this.setRoutes = this.setRoutes.bind(this);
    this.updateVideo = this.updateVideo.bind(this);
    this.isMapActive = 1;
    this.state.loadingSpinner = false;
  }

  componentDidMount() {
    axios
      .post(
        "https://skloa3avwj.execute-api.us-east-1.amazonaws.com/prototype",
        {
          vin: this.props.match.params.vin
        }
      )
      .then(response => {
        console.log("data", typeof response.data.message);
        this.setState({ loadingSpinner: true });
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
    this.player = videojs("car-video");
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

      if (videodetails[0].url) {
        this.player.src({
          src: videodetails.length > 0 ? videodetails[0].url : "",
          type: "application/x-mpegURL"
        });
      } else {
        this.player.src({
          src:
            "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
          type: "application/x-mpegURL"
        });
      }
      console.log("this.videoJsOptions", videodetails);
    }
    // update seekbar
    this.player.on("timeupdate", this.seekTimeUpdate);
  }
  setRoutes() {
    // this.refs.googleMap.setRoutes();
    console.log("this.refs", this.refs);
    if (this.player.userActive_ && this.isMapActive == 1) {
      // Play the video
      this.player.play();
      this.refs.googleMap.setRoutes();
      this.isMapActive = 2;
    } else if (this.isMapActive == 2) {
      this.player.pause();
      this.refs.googleMap.stopMovement();
      this.isMapActive = 3;
    } else {
      // Pause the video
      this.player.play();
      this.refs.googleMap.startMovement();
      this.isMapActive = 2;

      // Update the button text to 'Play'
      //  playPause.classList.toggle('pause');
    }
    // console.log("this.isPlayed", this.isPlayed);
  }

  renderSensor(streamData) {
    if (streamData) {
      return streamData.map((data, i) => {
        i++;
        const classN = `sensor pos-${i}`;
        return (
          <span
            key={i}
            className={classN}
            onClick={() => this.updateVideo(data.name)}
          />
        );
      });
    }
  }

  // Custom control bar start
  playPause = e => {
    if (this.player.paused() && this.isMapActive === 1) {
      this.player.play();
      e.target.innerHTML = "Paused";
      // this.refs.googleMap.setRoutes();
      // this.isMapActive = 2;
    } else {
      this.player.pause();
      e.target.innerHTML = "Play";
    }
  };

  videoSeek = event => {
    let val = event.target.value;
    const player = this.player;
    // change the value on slide
    this.setState(prevState => ({
      controlBar: {
        ...prevState.controlBar,
        inputRangeVal: val
      }
    }));

    // Get current time
    let seekto = player.duration() * (val / 100);
    player.currentTime(seekto);
  };

  seekTimeUpdate() {
    const seekslider = document.getElementById("seekslider");
    const curtimetext = document.getElementById("curtimetext");
    const durtimetext = document.getElementById("durtimetext");

    // Sync seekbar with video
    let newTime = this.currentTime() * (100 / this.duration());
    seekslider.value = newTime;

    // Update min to sec and vice versa
    let curmins = Math.floor(this.currentTime() / 60);
    let cursecs = Math.floor(this.currentTime() - curmins * 60);
    let durmins = Math.floor(this.duration() / 60);
    let dursecs = Math.floor(this.duration() - durmins * 60);
    if (cursecs < 10) {
      cursecs = "0" + cursecs;
    }
    if (dursecs < 10) {
      dursecs = "0" + dursecs;
    }
    if (curmins < 10) {
      curmins = "0" + curmins;
    }
    if (durmins < 10) {
      durmins = "0" + durmins;
    }

    // update ui
    curtimetext.innerHTML = `${curmins}:${cursecs}`;
    durtimetext.innerHTML = `${durmins}:${dursecs}`;
  }

  fullScreenToggle = event => {
    const fullscreenbtn = event.target;
    const player = this.player;
    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.webkitRequestFullScreen) {
      player.webkitRequestFullScreen();
    } else if (player.mozRequestFullScreen) {
      player.mozRequestFullScreen();
    }
  };
  // Custom control bar end

  render() {
    return this.state.loadingSpinner ? (
      this.state.responseFlag ? (
        <div className="car-details">
          <div className="container">
            <div className="row ">
              <div className="col-12 d-flex">
                <div className="car-image">
                  {this.renderSensor(this.state.cardata.streamData)}
                </div>
                <div className="car-video">
                  <div className="car-id">{this.props.match.params.vin}</div>
                  {/* <CarVideo videoOptions={this.state.videoJsOptions} /> */}
                  <div className="video-container">
                    <video
                      id="car-video"
                      className="video-js vjs-default-skin"
                      controls
                      preload="auto"
                      style={{ width: 100 + "%" }}
                      data-setup="{}"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row"
              style={{ marginTop: "-9px", minHeight: "100px" }}
            >
              <div className="col-12 d-flex p-0">
                <button onClick={this.setRoutes}>click me....</button>
                {/* <button onClick={this.refs.googleMap.stopMovement}>stop....</button>
            <button onClick={this.refs.googleMap.startMovement}>start....</button> */}
              </div>
            </div>
<<<<<<< Updated upstream
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
=======

            <div id="video-control-bar">
              <button id="playpausebtn" onClick={this.playPause}>
                Play Pause
              </button>
              <input
                id="seekslider"
                type="range"
                name="points"
                min="0"
                max="100"
                step="1"
                value={this.state.controlBar.inputRangeVal}
                onChange={this.videoSeek}
              />

              <span id="curtimetext">00:00</span>
              <span>&nbsp;/&nbsp;</span>
              <span id="durtimetext"> 00:00 </span>
              <button id="fullscreenbtn" onClick={this.fullScreenToggle}>
                [&nbsp;]
              </button>
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
>>>>>>> Stashed changes
            </div>
            <div className="row charts" style={{ marginTop: "18px" }}>
              <div className="donutChart">
                <DonutChart />
              </div>
              <div className="barChart">
                <BarChart />
              </div>
              <div className="lineChart">
                <LineChart />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Modal ref="modalform" />
      )
    ) : (
      <div style={{ position: "absolute", top: "50%", left: "50%" }}>
        <FadeLoader
          height={15}
          heightUnit="px"
          width={5}
          widthUnit="px"
          margin="2px"
          radius={10}
        />
      </div>
    );
  }
}

export default CarDetail;
