import React from "react";
import { Doughnut, Chart } from "react-chartjs-2";
import "../_chart.scss";

export default class DonutWithText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donutChartData: {}
    };
  }

  getDonutChartData() {
    this.setState({
      donutChartData: {
        labels: ["trip1", "trip2", "trip3"],
        datasets: [
          {
            data: [22, 6, 10],
            backgroundColor: [
              "rgb(0, 228, 228)",
              "rgb(255, 00, 00)",
              "rgb(62, 57, 57)"
            ],
            hoverBackgroundColor: [
              "rgb(0, 228, 228)",
              "rgba(255, 00, 00)",
              "rgba(62, 57, 57)"
            ]
          }
        ],
        text: "38 Total Trips"
      }
    });
  }

  componentDidMount() {
    this.getDonutChartData();
  }
  render() {
    const data = this.state.donutChartData;
    let originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
    Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
      draw: function() {
        originalDoughnutDraw.apply(this, arguments);

        let chart = this.chart;
        let width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx;

        let fontSize = 1;
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";

        let text = chart.config.data.text,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;

        ctx.fillText(text, textX, textY);
      }
    });
    return (
      <div className="donut-chart">
        <Doughnut
          data={this.state.donutChartData}
          options={{
            cutoutPercentage: 70,
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            hover: { intersect: false },

            legend: {
              display: false
            }
          }}
        />
      </div>
    );
  }
}
