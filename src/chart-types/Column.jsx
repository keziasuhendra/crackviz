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
        chart: {
          animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                  enabled: true,
                  delay: 150
              },
              dynamicAnimation: {
                  enabled: true,
                  speed: 350
              }
          },
          toolbar: {
            show: false
          }
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
        title: {
          text: 'Time Needed to Crack a Game',
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize:  '20px',
            color:  '#263238'
          },
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
            // colors: ['#41B883', '#E46651', '#E46651'],
            shade: 'light',
            type: "horizontal",
            shadeIntensity: 0.25,
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
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          position: 'top',
          horizontalAlign: 'right',
          markers: {
            width: 10,
            height: 10,
            strokeWidth: 0,
            strokeColor: '#41B883',
            radius: 5,
            offsetX: 0,
            offsetY: 0
          },
         
          onItemClick: {
            toggleDataSeries: false
          },
        },
        plotOptions: {
          bar: {
              distributed: false,
              columnWidth: '50%',
          }
        }
      },
      series: [
        {
          name: 'Denuvo',
          data: [30, 40, 25, 50, 49, 21, 70, 51]
        }
    ],
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
