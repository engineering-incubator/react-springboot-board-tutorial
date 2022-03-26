var express = require("express");
var apiMocker = require("connect-api-mocker");

var app = express();

app.use("/api", apiMocker("mocks/api"));

app.listen(8080);
