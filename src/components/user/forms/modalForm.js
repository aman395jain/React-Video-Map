import React, { Component } from "react";
import "./_userForm.scss";

class ModalForm extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#basicExampleModal"
        >
          Launch demo modal
        </button>
        <div
          className="modal fade top"
          id="basicExampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="exampleModalLabel">
                  Permission Access
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">Requested for access permission.</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary">
                  Access
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Denied
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalForm;
