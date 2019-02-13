import React from "react";
import { Line } from "react-chartjs-2";

import "../_chart.scss";

export default class lineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lineChartData: {}
    };
  }

  getLineChartData() {
    const dataFirst = {
      label: "Engine",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgb(75,192,192)",
      borderColor: "rgb(75,192,192)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgb(75,192,192)",
      pointBackgroundColor: "rgb(75,192,192)",
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(75,192,192)",
      pointHoverBorderColor: "rgb(220,220,220)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, null]
    };
    const dataSecond = {
      label: "Gear",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgb(255,69,0)",
      borderColor: "rgb(255,69,0)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgb(255,69,0)",
      pointBackgroundColor: "rgb(255,69,0)",
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(255,69,0)",
      pointHoverBorderColor: "rgb(255,69,0)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [81, 46, 55, 65, 72, 80, null]
    };
    const dataThird = {
      label: "Wheel",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "#2087ff",
      borderColor: "#2087ff",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#2087ff",
      pointBackgroundColor: "#2087ff",
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#2087ff",
      pointHoverBorderColor: "#2087ff",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [30, 75, 65, 91, 38, 90, null]
    };

    const data = {
      labels: ["2017", "2018", "2019", "2020", "2021", "2022", ""],
      datasets: [dataFirst, dataSecond, dataThird]
    };
    this.setState({
      lineChartData: data
    });
  }

  componentDidMount() {
    this.getLineChartData();
  }

  render() {
    // Chart.plugins.register({
    //   afterUpdate: function(chart) {
    //     let offset = 17;
    //     let model = null;
    //     for (let i = 0; i < chart.config.data.datasets.length; i++) {
    //       for (let j = 0; j < chart.config.data.datasets[i].data.length; j++) {
    //         model = chart.config.data.datasets[i]._meta[0].data[j]._model;
    //         model.x += offset;
    //         model.controlPointNextX += offset;
    //         model.controlPointPreviousX += offset;
    //       }
    //     }
    //   }
    // });
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 line-chart-header">Anomaly Detection</div>
          <div className="col-md-12 line-chart-container">
            <Line
              data={this.state.lineChartData}
              options={{
                legend: {
                  display: true,
                  position: "bottom",
                  labels: { boxWidth: 10 }
                },
                responsive: true,
                animation: false,
                scales: {
                  xAxes: [
                    {
                      gridLines: {
                        offsetGridLines: true,
                        display: false
                      },
                      ticks: {
                        labelOffset: 10
                      }
                    }
                  ],
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                        stepSize: 20,
                        max: 120,
                        padding: 10,
                        fontSize: 13
                      },
                      gridLines: {
                        drawBorder: false
                      }
                    }
                  ]
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
