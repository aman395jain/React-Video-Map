import React, { Component } from "react";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import axios from "axios";
import { FadeLoader } from "react-spinners";

import tableData from "../../../data/carData.json";
import Header from "../../../shared/header/header.js";
import Modalform from "./../forms/modalForm";
import {} from "./_carManagement.scss";

class UserManagement extends Component {
  state = {
    selected: {},
    selectAll: 0,
    data: [],
    openModal: false,
    loadingSpinner: false
  };

  componentDidMount() {
    axios
      .get("https://rqnsxqzbok.execute-api.us-east-1.amazonaws.com/prototype")
      .then(response => {
        console.log("response data", response.data);
        this.setState({ loadingSpinner: true });
        this.setState({ data: response.data });
      })
      .catch(err => {
        console.log("ERROR :: " + err);
      });
  }

  toggleRow(name) {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[name] = !this.state.selected[name];
    this.setState({
      selected: newSelected,
      selectAll: 2
    });
  }

  // Select all table row checkout box
  toggleSelectAll(object) {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      this.state.data.forEach(row => {
        newSelected[row.name] = true;
      });
    }

    this.setState({
      selected: newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0
    });
  }

  openModal(e) {
    this.refs.modalform.onOpenModal(e);
  }

  userListColumn() {
    const columns = [
      {
        Header: "Incident No.",
        accessor: "",
        Cell: ({ original }) => {
          return (
            <div className="d-flex align-items-center">
              <Link
                to={{
                  pathname: "/carDetails/" + original.vin,
                  param1: "Par1"
                }}
                className="car-name"
              >
                {original.incident_no}
              </Link>
            </div>
          );
        }
      },
      {
        Header: "Date",
        accessor: "dateTime"
      },
      {
        Header: "VIN",
        accessor: "vin"
      },
      {
        Header: "Car Model",
        accessor: "car_model"
      },
      {
        Header: "Status",
        Cell: ({ original }) => {
          return (
            <div
              className={
                original.status.toLocaleLowerCase() === "inactive"
                  ? "inactive"
                  : ""
              }
            >
              {original.status}
            </div>
          );
        },
        width: 100
      }
    ];
    return columns;
  }

  renderTableRowActions() {
    if (this.state.selectAll > 0) {
      return (
        <div className="table-actions">
          <button className="btn btn-outline-secondary small">
            <i className="fas fa-pen" />
          </button>
          <button className="btn btn-outline-secondary small ml-2 mr-2">
            <i className="far fa-check-circle" />
          </button>
          <button className="btn btn-outline-secondary small">
            <i className="fas fa-times" />
          </button>
        </div>
      );
    }
    return <div className="" />;
  }
  render() {
    return (
      <div className="car-management">
        <Header isAuthorized={this.state.isLogin} />
        <div className="container">
          <div className="user-list row">
            <div className="car-list-header col-md-12">
              Car Information List
            </div>
            <div className="col-md-12 user-list-table-container">
              <div className="col-md-12">{this.renderTableRowActions()}</div>
              {this.state.loadingSpinner ? (
                <div className="col-md-12">
                  <ReactTable
                    className="user-list-table table-striped mt-3"
                    data={this.state.data}
                    columns={this.userListColumn()}
                    defaultPageSize={2}
                    id="table-to-xls"
                    showPagination={false}
                  />
                </div>
              ) : (
                <div style={{ position: "absolute", top: "50%", left: "50%" }}>
                  <FadeLoader
                    height={15}
                    width={5}
                    margin="2px"
                    radius={2}
                    color="#ffffff"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserManagement;
