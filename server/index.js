const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
// const session = require("express-session");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const fs = require('fs');
const app = express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser());
app.use("/static", express.static("./build/static"));
app.set("view engine", "jade");
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

var data = [
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




app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.post('/getFullData', function (req, res) {
  res.json(data);
});
app.post('/getDataWithDate', function (req, res) {
  console.log(req.body);
  const from = new Date(req.body.from).getTime();
  const to = new Date(req.body.to).getTime();
  const newData = []
  if (from && to) {
    data.map((dateDate) => {
      if (dateDate[0] >= from && dateDate[0] <= to) {
        newData.push(dateDate)
      }
    })
  } else if (!to) {
    data.map((dateDate) => {
      if (dateDate[0] >= from) {
        newData.push(dateDate)
      }
    })
  } else if (!from) {
    data.map((dateDate) => {
      if (ateDate[0] <= to) {
        newData.push(dateDate)
      }
    })
  }
  res.json(newData);
});


app.listen(3030, function () {
  console.log("Example app listening on port 3030!");
});
