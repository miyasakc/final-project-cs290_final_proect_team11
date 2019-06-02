

var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var fs = require("fs");

app.use(express.static('public'));

app.get('/', function (req, res, next) {
    res.status(200).sendFile(__dirname + '/public/monteCarlo.html');
  });

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});