import React, { Component } from 'react';
import moment from 'moment'
import ReactHighcharts from 'react-highcharts/ReactHighstock';
import logo from './logo.svg';
import './App.css';
const data = [{ x: 100, y: 200 }, { x: 120, y: 100 },
{ x: 170, y: 300 }, { x: 140, y: 250 },
{ x: 150, y: 400 }, { x: 110, y: 280 }]
const plotpoints = [
  // [
  //   new Date("2017-11-29T04:56:12Z").getTime(),

  //   126, // in seconds
  // ],
  // [
  //   new Date("2017-11-23T03:22:12Z").getTime(),

  //   205,
  // ],
  // [
  //   new Date("2017-11-02T02:24:12Z").getTime(),

  //   20,
  // ],
  // [
  //   new Date("2017-11-08T05:24:12Z").getTime(),

  //   90,
  // ],
  // [
  //   new Date("2017-11-18T06:24:12Z").getTime(),

  //   90,
  // ],
  [
    new Date("2017-11-10T14:12:12Z").getTime(),

    200,
  ],
  [1401580800000, 5.1],
  [1401667200000, 6.6],
  [1401753600000, 9.7],
  [1401840000000, 9.6],
  [1401926400000, 13.0],
  [1402012800000, 12.9],
  [1402099200000, 8.5],
  [1402185600000, 9.2],
  [1402272000000, 10.5],
  [1402358400000, 7.3],
  [1402444800000, 12.1],
  [1402531200000, 11.1],
  [1402617600000, 200],
  [1402704000000, 5.8],
  [1402790400000, 7.4],
  [1402876800000, 10.3],
  [1402963200000, 7.8],
  [1403049600000, 11.6],
  [1403136000000, 9.8],
  [1403222400000, 10.7],
  [1403308800000, 9.0],
  [1403395200000, 5.1],
  [1403481600000, 10.0],
  [1403568000000, 5.2],
  [1403654400000, 6.3],
  [1403740800000, 5.5],
  [1403827200000, 8.4],
  [1403913600000, 7.1],
  [1404000000000, 6.1],
  [1404086400000, 8.4],

  [1404172800000, 7.6],
  [1404259200000, 8.1],
  [1404345600000, 11.2],
  [1404432000000, 6.4],
  [1404518400000, 12.7],
  [1404604800000, 15.3],
  [1404691200000, 15.1],
  [1404777600000, 10.8],
  [1404864000000, 15.8],
  [1404950400000, 15.8],
  [1405036800000, 15.2],
  [1405123200000, 14.9],
  [1405209600000, 13.1],
  [1405296000000, 15.5],
  [1405382400000, 14.7],
  [1405468800000, 14.4],
  [1405555200000, 12.6],
  [1405641600000, 13.9],
  [1405728000000, 11.3],
  [1405814400000, 13.3],
  [1405900800000, 13.3],
  [1405987200000, 14.0],
  [1406073600000, 14.1],
  [1406160000000, 15.4],
  [1406246400000, 17.0],
  [1406332800000, 16.6],
  [1406419200000, 13.3],
  [1406505600000, 16.8],
  [1406592000000, 16.0],
  [1406678400000, 14.4],
  [1406764800000, 12.8],


];


class App extends Component {
  formatXAxis = (tickItem) => { // do something to format tick label 
    console.log(tickItem)
  }
  render() {
    console.log(plotpoints)
    const config = {

      chart: {
        type: 'scatter',
        zoomType: 'xy'
      },
      rangeSelector: {
        allButtonsEnabled: true,
        selected: 1
      },
      title: {
        text: 'Scatter Chart'
      },
      xAxis: {
        type: 'datetime',

        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: '(min)'
        },
        min: 0
      },

      events: {
        click: function () {
          alert('Category: ' + this.category + ', value: ' + this.y);
        }
      },
      colors: ['#6CF', '#39F', '#06C', '#036', '#000'],

      // Define the data points. All series have a dummy year
      // of 1970/71 in order to be compared on the same x axis. Note
      // that in JavaScript, months start at 0 for January, 1 for February etc.
      series: [{
        name: "Demo",
        data: plotpoints,
        events: {
          click: function (d) {
            console.log('Category: ', d.point.color);
            if (d.point.color === '#6CF') {
              d.point.color = '#036';
            } else {
              d.point.color = '#6CF';
            }
          }
        }
      }]

    };
    return (
      <div className='App'>
        <ReactHighcharts config={config}></ReactHighcharts>
      </div>
    )
  }
}
export default App;
