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

// app.use(express.static(path.join(__dirname, "build")));



var Blockchain = [];




app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.post('/loginUsers', function (req, res) {
  console.log(req.body);

  res.json({
    userVaild: false,
    data: ''
  });
  // res.json(decrypt(pass,Blockchain[Blockchain.length-1].Data[req.body.data].pilotLog));
});


app.listen(3030, function () {
  console.log("Example app listening on port 3030!");
});
