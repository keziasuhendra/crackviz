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
          categories: this.props.data.map(datum => datum.x),
          // categories: ['Injustice 2', 'Ragnarok Online', 'Counter Strike', 'The Sherlock Holmes', 'Battlezone God Edition', 'Adrift', 'Far Cry Primal', 'Planet Coaster'],
          labels: {
            rotate: -45,
            rotateAlways: true,
            maxHeight: 300,
            style: {
              fontSize: '12px'
            }
          },
          tooltip: {
            enabled: true
          }
        },
        yaxis: {
          title: {
            text: 'Day(s)',
            style: {
              fontSize: '14px'
            }
          },
          labels: {
            style: {
              fontSize: '14px'
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
            fontSize: '30px',
            color: '#263238'
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
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100]
          }
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          position: 'top',
          horizontalAlign: 'right',
          floating: false,
          fontSize: '17px',
          markers: {
            width: 10,
            height: 10,
            strokeWidth: 0,
            strokeColor: '#41B883',
            radius: 5,
            offsetX: 0,
            offsetY:0
          },
          itemMargin: {
            horizontal: 10,
            vertical: 15
          },
          onItemClick: {
            toggleDataSeries: false
          },
        },
        grid: {
          yaxis: {
            lines: {
                show: true
            }
          },
          row: {
            colors: ['#fff', '#f2f2f2']
          }
        },
        plotOptions: {
          bar: {
              distributed: false,
              columnWidth: '70%%',
              dataLabels : {
                position: 'top'
              }
          }
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: '10px',
            colors: ["#000000"]
          }
        },
        theme: {
          mode: 'light', 
          palette: 'palette1', 
          monochrome: {
              enabled: false,
              color: '#255aee',
              shadeTo: 'light',
              shadeIntensity: 0.65
          },
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

    return (
      <div className="column">
        <Chart options={this.state.options} series={this.state.series} type="bar" width="1200" />
      </div>
    );
  }
}

export default Column;
