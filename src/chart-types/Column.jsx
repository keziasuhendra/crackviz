import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Column extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['Injustice 2', 'Ragnarok Online', 'Counter Strike', 'The Sherlock Holmes', 'Battlezone God Edition', 'Adrift', 'Far Cry Primal', 'Planet Coaster'],
          labels: {
            rotate: -45,
            rotateAlways: true
          }
        },
        yaxis: {
          title: {
            text: 'Day(s)'
          }
        },
        tooltip: {
          followCursor: true,
          x: {
            show: true
          },
          y: [{
            formatter: function (y) {
              if(typeof y !== "undefined") {
                return y.toFixed(0) + " day(s)";
              }
              return y;
            }
          }, {
            formatter: function (y) {
              if(typeof y !== "undefined") {
                return y.toFixed(2) + " $";
              }
              return y;
            }
          }]
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100]
          },
        },
        grid: {
          row: {
            colors: ['#fff', '#f2f2f2']
          }
        }
      },
      series: [{
        name: 'time needed to crack',
        data: [30, 40, 25, 50, 49, 21, 70, 51]
      }],
    }
  }

  render() {

    return (
      <div className="column">
        <Chart options={this.state.options} series={this.state.series} type="bar" width="500" />
      </div>
    );
  }
}

export default Column;
