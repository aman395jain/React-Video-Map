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
        labels: ["18-24", "25-34", "35-44", "44-55", "55-64", "65+"],
        datasets: [
          {
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
