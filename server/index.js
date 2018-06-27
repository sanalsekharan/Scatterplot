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
  [1515954600000, 5.1, 'pass'],
  [1516991400000, 6.6, 'error'],
  [1517596200000, 9.7, 'error'],
  [1518633000000, 9.6, 'error'],
  [1519151400000, 13.0, 'pass'],
  [1519669800000, 12.9, 'pass'],
  [1520274600000, 8.5, 'pass'],
  [1520793000000, 9.2, 'fail'],
  [1521570600000, 10.5, 'pass'],
  [1522089000000, 7.3, 'pass'],
  [1522953000000, 12.1, 'pass'],
  [1523471400000, 11.1, 'pass'],
  [1523989800000, 200, 'pass'],
  [1524508200000, 5.8, 'fail'],
  [1525026600000, 7.4, 'pass'],
  [1525545000000, 10.3, 'pass'],
  [1526063400000, 7.8, 'pass'],
  [1526581800000, 11.6, 'pass'],
  [1527100200000, 9.8, 'fail'],
  [1528223400000, 10.7, 'pass'],
  [1528741800000, 9.0, 'pass'],
  [1529260200000, 5.1, 'pass'],
  [1529778600000, 10.0, 'pass'],
  [1530297000000, 5.2, 'pass'],
  [1530815400000, 6.3, 'error'],
  [1531333800000, 5.5, 'pass'],
  [1531852200000, 8.4, 'pass'],
  [1532111400000, 7.1, 'pass'],
  [1532629800000, 6.1, 'pass'],
  [1533234600000, 8.4, 'pass'],
  [1533753000000, 7.6, 'pass'],
  [1534271400000, 8.1, 'pass'],
  [1534789800000, 11.2, 'pass'],
  [1535308200000, 6.4, 'fail'],
  [1536172200000, 12.7, 'pass'],
  [1536690600000, 15.3, 'fail'],
  [1537209000000, 15.1, 'pass'],
  [1537727400000, 10.8, 'error'],
  [1538764200000, 15.8, 'pass'],
  [1539302400000, 15.8, 'fail'],
  [1539820800000, 15.2, 'pass'],
  [1540339200000, 14.9, 'pass'],
  [1540857600000, 13.1, 'pass'],
  [1533234600000, 15.5, 'pass'],
  [1541183400000, 14.7, 'error'],
  [1541701800000, 14.4, 'pass'],
  [1542240000000, 12.6, 'pass'],
  [1542499200000, 13.9, 'fail'],
  [1543017600000, 11.3, 'pass'],
  [1543536000000, 13.3, 'error'],
  [1543775400000, 13.3, 'pass'],
  [1544034600000, 14.0, 'pass'],
  [1544293800000, 14.1, 'pass'],
  [1544572800000, 15.4, 'pass'],
  [1544832000000, 17.0, 'pass'],
  [1545091200000, 16.6, 'error'],
  [1545350400000, 13.3, 'pass'],
  [1545609600000, 16.8, 'pass'],
  [1545868800000, 16.0, 'pass'],
  [1546128000000, 14.4, 'pass'],
  [1541980800000, 12.8, 'pass'],
];




app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.post('/getFullData', function (req, res) {
  res.json(data);
});
app.post('/getDataWithDate', function (req, res) {
  // console.log(req.body);
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
