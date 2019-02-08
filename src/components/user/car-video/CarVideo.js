import React, { Component } from "react";
import videojs from "video.js";

class CarVideo extends Component {
  // state = {}
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      // console.log("this.props", this.props);
    });
    let controlBar = document.getElementsByClassName('vjs-control-bar');
    console.log('controlBar',this.player.getChild("controlBar"));
    controlBar[0].className += " control-bar-pos"
    //controlBar[0].addClass('control-bar-pos');
  }

  componentWillUnmount() {
    // destroy player on unmount
    if (this.player) {
      this.player.dispose();
    }
  }
  render() {
    return (
      <div className="video-container">
        <div data-vjs-player>
          <video ref={node => (this.videoNode = node)} className="video-js" />
        </div>
      </div>
    );
  }
}
export default CarVideo;
