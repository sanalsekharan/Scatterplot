import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import axios from 'axios';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';

import './App.css';


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
    this.getData = this.getData.bind(this);
    this.setData = this.setData.bind(this);
  }

  componentDidMount() {
    this.getData()

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
    // console.log(from, to)

    axios.post('http://localhost:3030/getDataWithDate', { from: from, to: to }).then(
      function (response, err) {
        let plotpoint = response.data;
        this.setData(plotpoint);
      }.bind(this)
    );
  }
  setData(plotpoint) {
    const fail = [];
    const pass = [];
    const error = [];
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
  }
  getData() {
    const fail = [];
    const pass = [];
    const error = [];
    axios.post('http://localhost:3030/getFullData').then(
      function (response, err) {
        let plotpoint = response.data;
        this.setData(plotpoint);

      }.bind(this)
    );
  }
  reset() {
    this.getData()
    this.setState({
      from: undefined,
      to: undefined
    })
  }
  render() {
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
            pointFormat: ' {point.y} Min'
          }
        }
      },
      colors: ['#70bf44', '#ec4047', '#f68b37', '#036', '#000'],
      series: [{
        name: "Pass",
        data: this.state.pass,
        events: {
          click: function (d) {
            // // console.log('Category: ', d.point.color);
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
            // // console.log('Category: ', d.point.color);
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
            // // // console.log('Category: ', d.point.color);
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
            numberOfMonths: 1,
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
              numberOfMonths: 1,
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
