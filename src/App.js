import React, { Component } from 'react';
import moment from 'moment'
import ReactHighcharts from 'react-highcharts';
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
  [
    new Date("2017-11-08T05:24:12Z").getTime(),

    90, 'pass'
  ],
  [
    new Date("2017-11-18T06:24:12Z").getTime(),
    90, 'fail'
  ],
  [
    new Date("2017-11-10T14:12:12Z").getTime(),

    200, 'error'
  ],
  [1401580800000, 5.1, 'pass'],
  [1401667200000, 6.6, 'error'],
  [1401753600000, 9.7, 'error'],
  [1401840000000, 9.6, 'error'],
  [1401926400000, 13.0, 'pass'],
  [1402012800000, 12.9, 'pass'],
  [1402099200000, 8.5, 'pass'],
  [1402185600000, 9.2, 'fail'],
  [1402272000000, 10.5, 'pass'],
  [1402358400000, 7.3, 'pass'],
  [1402444800000, 12.1, 'pass'],
  [1402531200000, 11.1, 'pass'],
  [1402617600000, 200, 'pass'],
  [1402704000000, 5.8, 'fail'],
  [1402790400000, 7.4, 'pass'],
  [1402876800000, 10.3, 'pass'],
  [1402963200000, 7.8, 'pass'],
  [1403049600000, 11.6, 'pass'],
  [1403136000000, 9.8, 'fail'],
  [1403222400000, 10.7, 'pass'],
  [1403308800000, 9.0, 'pass'],
  [1403395200000, 5.1, 'pass'],
  [1403481600000, 10.0, 'pass'],
  [1403568000000, 5.2, 'pass'],
  [1403654400000, 6.3, 'error'],
  [1403740800000, 5.5, 'pass'],
  [1403827200000, 8.4, 'pass'],
  [1403913600000, 7.1, 'pass'],
  [1404000000000, 6.1, 'pass'],
  [1404086400000, 8.4, 'pass'],

  [1404172800000, 7.6, 'pass'],
  [1404259200000, 8.1, 'pass'],
  [1404345600000, 11.2, 'pass'],
  [1404432000000, 6.4, 'fail'],
  [1404518400000, 12.7, 'pass'],
  [1404604800000, 15.3, 'fail'],
  [1404691200000, 15.1, 'pass'],
  [1404777600000, 10.8, 'error'],
  [1404864000000, 15.8, 'pass'],
  [1404950400000, 15.8, 'fail'],
  [1405036800000, 15.2, 'pass'],
  [1405123200000, 14.9, 'pass'],
  [1405209600000, 13.1, 'pass'],
  [1405296000000, 15.5, 'pass'],
  [1405382400000, 14.7, 'error'],
  [1405468800000, 14.4, 'pass'],
  [1405555200000, 12.6, 'pass'],
  [1405641600000, 13.9, 'fail'],
  [1405728000000, 11.3, 'pass'],
  [1405814400000, 13.3, 'error'],
  [1405900800000, 13.3, 'pass'],
  [1405987200000, 14.0, 'pass'],
  [1406073600000, 14.1, 'pass'],
  [1406160000000, 15.4, 'pass'],
  [1406246400000, 17.0, 'pass'],
  [1406332800000, 16.6, 'error'],
  [1406419200000, 13.3, 'pass'],
  [1406505600000, 16.8, 'pass'],
  [1406592000000, 16.0, 'pass'],
  [1406678400000, 14.4, 'pass'],
  [1406764800000, 12.8, 'pass'],


];


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fail: [],
      pass: [],
      error: []
    }
  }

  componentDidMount() {
    const fail = [];
    const pass = [];
    const error = [];
    plotpoints.map((data) => {
      if (data[2] == 'pass') {
        pass.push(data)
      } else if (data[2] == 'fail') {
        fail.push(data)
      } else {
        error.push(data)
      }
    })
    this.setState({ pass, error, fail })
  }
  render() {
    console.log(this.state.pass, 'here pass')

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

      plotOptions: {

      },

      events: {
        click: function () {
          alert('Category: ' + this.category + ', value: ' + this.y);
        }
      },
      colors: ['#70bf44', '#ec4047', '#f68b37', '#036', '#000'],
      series: [{
        name: "Pass",
        data: this.state.pass,
        events: {
          click: function (d) {
            console.log('Category: ', d.point.color);
            if (d.point.color === '#70bf44') {
              d.point.color = '#000';
            } else {
              d.point.color = '#70bf44';
            }
          }
        }
      }, {
        name: "Fail",
        data: this.state.fail,
        events: {
          click: function (d) {
            console.log('Category: ', d.point.color);
            if (d.point.color === '#ec4047') {
              d.point.color = '#000';
            } else {
              d.point.color = '#ec4047';
            }
          }
        }
      }, {
        name: "Error",
        data: this.state.error,
        events: {
          click: function (d) {
            console.log('Category: ', d.point.color);
            if (d.point.color === '#f68b37') {
              d.point.color = '#000';
            } else {
              d.point.color = '#f68b37';
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
