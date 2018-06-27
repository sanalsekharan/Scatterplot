import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import axios from 'axios';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';

import './App.css';
const plotpoints = [
  // [
  //   new Date("2017-11-29T04:56:12Z").getTime(),

  //   126, // in seconds
  // ],
  // [
  //   new Date("2017-11-23T03:22:12Z").getTime(),

  //   205,
  // ],
  [
    new Date("2018-11-02T02:24:12Z").getTime(),

    20,
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
      error: [],
      from: undefined,
      to: undefined,
    }
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.checkdate = this.checkdate.bind(this);
  }

  componentDidMount() {
    const fail = [];
    const pass = [];
    const error = [];
    axios.post('http://localhost:3030/getFullData').then(
      function (response, err) {
        let plotpoint = response.data;
        plotpoint.map((data) => {
          if (data[2] == 'pass') {
            pass.push(data)
          } else if (data[2] == 'fail') {
            fail.push(data)
          } else {
            error.push(data)
          }
        })
        this.setState({ pass, error, fail })
      }.bind(this)
    );

  }
  focusTo() {
    this.timeout = setTimeout(() => this.to.getInput().focus(), 0);
  }
  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }
  handleFromChange(from) {
    const { to } = this.state;
    this.setState({ from });
    this.checkdate(from, to);
  }
  handleToChange(to) {
    const { from } = this.state;
    this.setState({ to }, this.showFromMonth);
    this.checkdate(from, to);
  }
  checkdate(from, to) {
    console.log(from, to)
    const fail = [];
    const pass = [];
    const error = [];
    axios.post('http://localhost:3030/getDataWithDate', { from: from, to: to }).then(
      function (response, err) {
        let plotpoint = response.data;
        console.log(response)
        plotpoint.map((data) => {
          if (data[2] == 'pass') {
            pass.push(data)
          } else if (data[2] == 'fail') {
            fail.push(data)
          } else {
            error.push(data)
          }
        })
        this.setState({ pass, error, fail })
      }.bind(this)
    );
  }
  reset() {
    alert('reset')
  }
  render() {
    console.log(moment(new Date(1402358400000)).format("DD-MM-YYYY"));
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
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
        scatter: {
          marker: {
            radius: 5,
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)'
              }
            }
          },
          states: {
            hover: {
              marker: {
                enabled: true
              }
            }
          },
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.y} sec'
          }
        }
      },
      colors: ['#70bf44', '#ec4047', '#f68b37', '#036', '#000'],
      series: [{
        name: "Pass",
        data: this.state.pass,
        events: {
          click: function (d) {
            // console.log('Category: ', d.point.color);
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
            // console.log('Category: ', d.point.color);
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
            // console.log('Category: ', d.point.color);
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
        <DayPickerInput
          value={from}
          placeholder="From"
          format="LL"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
            numberOfMonths: 2,
            onDayClick: () => this.to.getInput().focus(),
          }}
          onDayChange={this.handleFromChange}
        />{' '}
        —{' '}
        <span className="InputFromTo-to">
          <DayPickerInput
            ref={el => (this.to = el)}
            value={to}
            placeholder="To"
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 2,
            }}
            onDayChange={this.handleToChange}
          />
        </span>
        <button
          onClick={() => this.reset()}>Reset Filter</button>
        <ReactHighcharts config={config}></ReactHighcharts>
      </div>
    )
  }
}
export default App;
