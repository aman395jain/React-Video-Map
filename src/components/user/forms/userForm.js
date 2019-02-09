import React, { Component } from "react";
import "./_userForm.scss";

class userForm extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="row user-form-main">
          <div className="col-4" />
          <div className="col-4 user-form">
            <div className="justify-content-between align-items-center user-head">
              <h3>User Form</h3>
            </div>

            <form>
              <div style={{ marginBottom: "3%" }}>
                Please select one or more
              </div>
              <div className="check-boxes">
                <div className="form-group form-check custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="form-check-input custom-control-input"
                    id="exampleCheck1"
                  />
                  <label
                    className="form-check-label custom-control-label"
                    htmlFor="exampleCheck1"
                  >
                    Video
                  </label>
                </div>
                <div className="form-group form-check custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="form-check-input custom-control-input"
                    id="exampleCheck2"
                  />
                  <label
                    className="form-check-label custom-control-label"
                    htmlFor="exampleCheck2"
                  >
                    Map
                  </label>
                </div>
                <div className="form-group form-check custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="form-check-input custom-control-input"
                    id="exampleCheck3"
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
                  <button type="submit" className="btn btn-primary">
                    Approve
                  </button>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary">
                    Reject
                  </button>
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
