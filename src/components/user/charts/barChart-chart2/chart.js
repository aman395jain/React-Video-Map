import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    };
  }

  static defaultProps = {
    displayTitle: true
  };

  render() {
    return (
      <div className="bar-chart">
        <Bar
          data={this.state.chartData}
          options={{
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    stepSize: 10,
                    min: 0,
                    max: 30,
                    padding: 15,
                    callback: function(value) {
                      return ((value / 100) * 100).toFixed(0) + "%";
                    }
                  },
                  gridLines: {
                    drawBorder: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}

export default Charts;