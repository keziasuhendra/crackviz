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
          type: 'category',
          // categories: ['Injustice 2', 'Ragnarok Online', 'Counter Strike', 'The Sherlock Holmes', 'Battlezone God Edition', 'Adrift', 'Far Cry Primal', 'Planet Coaster'],
          categories: this.props.data.map(datum => datum.x),
          labels: {
            rotate: -45,
            rotateAlways: true,
            maxHeight: 300,
            style: {
              fontSize: '17px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Day(s)',
            style: {
              fontSize: '17px'
            }
          },
          labels: {
            style: {
              fontSize: '17px'
            }
          }
        },
        title: {
          text: 'Time Needed to Crack a Game',
          align: 'center',
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize:  '40px',
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
          type: 'solid',
          // gradient: {
          //   // colors: ['#41B883', '#E46651', '#E46651'],
          //   shade: 'light',
          //   type: "horizontal",
          //   shadeIntensity: 0.25,
          //   inverseColors: true,
          //   opacityFrom: 0.85,
          //   opacityTo: 0.85,
          //   stops: [50, 0, 100]
          // },
        },
        grid: {
          row: {
            colors: ['#fff', '#f2f2f2']
          }
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          position: 'bottom',
          horizontalAlign: 'center',
          fontSize: '17px',
          markers: {
            width: 10,
            height: 10,
            strokeWidth: 0,
            strokeColor: '#41B883',
            radius: 5,
            offsetX: 0,
            offsetY: 0
          },
          itemMargin: {
            horizontal: 20,
            vertical: 15
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
          // data: [30, 40, 25, 50, 49, 21, 70, 51]
          data: this.props.data.map(datum => datum.y)
        }
    ],
    }
  }

  render() {
    console.log('from column: ',this.props.data);
    return (
      <div className="column">
        <Chart options={this.state.options} series={this.state.series} type="bar" width="800" />
      </div>
    );
  }
}

export default Column;
