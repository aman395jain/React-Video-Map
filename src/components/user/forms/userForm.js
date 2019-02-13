import React, { Component } from "react";
import axios from "axios";
import "./_userForm.scss";

class userForm extends Component {
  constructor() {
    super();
    this.state = {
      isapproved: false,
      isVideoApproved: false,
      isMapApproved: false,
      isChartsApproved: false
    };
    this.updateState = this.updateRejectState.bind(this);
    this.updateVideoState = this.updateVideoState.bind(this);
    // this.updateMapState = this.updateMapState.bind(this);
    this.updateChartsState = this.updateChartsState.bind(this);
  }
  updateRejectState() {
    // console.log("ee" + e);
    // this.setState({ isapproved: e });
    // console.log("approved", this.state.isapproved);
    this.setState({
      isVideoApproved: false,
      isMapApproved: false,
      isChartsApproved: false
    });
  }
  updateVideoState() {
    this.setState({
      isVideoApproved: !this.state.isVideoApproved,
      isMapApproved: !this.state.isMapApproved
    });
  }

  // updateMapState() {
  //   this.setState({
  //     isMapApproved: !this.state.isMapApproved,
  //     isVideoApproved: !this.state.isVideoApproved
  //   });
  // }

  updateChartsState() {
    this.setState({ isChartsApproved: !this.state.isChartsApproved });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("form submit");
    axios
      .post(
        "https://qjn410lo43.execute-api.us-east-1.amazonaws.com/prototype",
        {
          vin: this.props.match.params.vin,
          // permission: this.state.isapproved ? true : false
          video_enabled: this.state.isVideoApproved ? true : false,
          map_enabled: this.state.isMapApproved ? true : false,
          speed_enabled: this.state.isChartsApproved ? true : false
        }
      )
      .then(response => {
        console.log("response data", response.data);
      })
      .catch(err => {
        console.log("ERROR : " + err);
      });
  }
  render() {
    console.warn(
      "in video check",
      this.state.isVideoApproved + " " + this.state.isMapApproved
    );
    return (
      <div>
        <div className="row user-form-main">
          <div className="col-4" />
          <div className="col-4 user-form">
            <div className="justify-content-between align-items-center user-head">
              <h3>Access Request</h3>
            </div>

            <form onSubmit={e => this.handleSubmit(e)}>
              <div style={{ marginBottom: "3%" }}>
                Please select one or more
              </div>
              <div className="check-boxes">
                <div className="form-group form-check custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="form-check-input custom-control-input"
                    id="exampleCheck1"
                    checked={this.state.isVideoApproved}
                    onChange={this.updateVideoState}
                  />
                  <label
                    className="form-check-label custom-control-label"
                    htmlFor="exampleCheck1"
                  >
                    Video and Map
                  </label>
                </div>
                {/* <div className="form-group form-check custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="form-check-input custom-control-input"
                    id="exampleCheck2"
                    checked={this.state.isMapApproved}
                    onChange={this.updateMapState}
                  />
                  <label
                    className="form-check-label custom-control-label"
                    htmlFor="exampleCheck2"
                  >
                    Map
                  </label>
                </div> */}
                <div className="form-group form-check custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="form-check-input custom-control-input"
                    id="exampleCheck3"
                    checked={this.state.isChartsApproved}
                    onChange={this.updateChartsState}
                  />
                  <label
                    className="form-check-label custom-control-label"
                    htmlFor="exampleCheck3"
                  >
                    Charts
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    // onClick={() => this.updateState(true)}
                  >
                    Approve
                  </button>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Your request is Approved and please refresh the
                            Car-details page.
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <button
                    className="btn btn-danger"
                    onClick={() => this.updateRejectState()}
                    data-toggle="modal"
                    data-target="#exampleModal1"
                  >
                    Reject
                  </button>
                  <div
                    className="modal fade"
                    id="exampleModal1"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Access request is rejected successfully.
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4" />
              </div>
            </form>
          </div>
          <div className="col-4" />
        </div>
      </div>
    );
  }
}

export default userForm;
