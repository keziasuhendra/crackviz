import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Bar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        xaxis: {
          categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          labels: {
            rotate: -45,
            rotateAlways: true
          }
        }
      },
      series: [{
        data: [30, 40, 25, 50, 49, 21, 70, 51]
      }],
    }
  }

  render() {

    return (
      <div className="bar">
        <Chart options={this.state.options} series={this.state.series} type="bar" width="500" />
      </div>
    );
  }
}

export default Bar;
