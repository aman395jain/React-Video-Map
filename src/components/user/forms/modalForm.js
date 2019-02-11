import React from "react";
import Modal from "react-responsive-modal";
import PropTypes from "prop-types";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.openPermissionForm = this.openPermissionForm.bind(this);
  }
  state = {
    open: false,
    vinnumber: 0
  };

  static contextTypes = {
    router: PropTypes.object
  };

  openPermissionForm() {
    //const vin = this.props.match.params.vin;
    const url = `/openform/${this.state.vinnumber}`;
    window.open(url, "_blank");
    // this.context.router.history.push(`/openform/${this.state.vinnumber}`);
  }

  onOpenModal = e => {
    this.setState({ vinnumber: e, open: true });
    //this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div style={styles}>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel">
                Permission Access
              </h4>
            </div>
            <div className="modal-body">Requested for access permission.</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.openPermissionForm()}
              >
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
        </Modal>
      </div>
    );
  }
}

export default ModalForm;
