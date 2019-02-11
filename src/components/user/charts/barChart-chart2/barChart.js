import React, { Component } from "react";
import Charts from "./chart";
import "../_chart.scss";

class barChart extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {}
    };
  }

  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    this.setState({
      chartData: {
        labels: ["00-04", "05-08", "09-12", "13-16", "17-20", "21+"],
        datasets: [
          {
            label: "Break Frequency",
            data: [20, 12, 8, 20, 12, 8],
            backgroundColor: [
              "rgb(0, 228, 228)",
              "rgb(0, 228, 228)",
              "rgb(0, 228, 228)",
              "rgb(0, 228, 228)",
              "rgb(0, 228, 228)",
              "rgb(0, 228, 228)"
            ]
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="barCharts">
        <Charts chartData={this.state.chartData} />
      </div>
    );
  }
}

export default barChart;
