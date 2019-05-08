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
              enabled: true,
              color: this.props.data.length > 0 ? this.getColorByDrm(this.props.data[0].drm) : '#F6F8F9',
              shadeTo: 'light',
              shadeIntensity: 0.65
          },
      }
      },
      series: [
        {
          name: 'Denuvo',
          data: this.props.data.map(datum => datum.y)
        }
    ],
    }
  }

  getColorByDrm = (drm) => {
    var def = "#F6F8F9";
    var color = def;
    switch(drm){
      case "denuvo":
        color = "#1865B4";
        break;
      case "steam":
        color = "#CC4201";
        break;
      case "epicgames":
        color = "#02734D";
        break;
      case "uplay":
        color = "#D70947";
        break;
      case "origin":
        color = "#772ACB";
        break;
      case "uwp":
        color = "#0A7683";
        break;
      case "battle.net":
        color = "#2530D5";
        break;
      default:
        color = def;
    }

    return color;
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
