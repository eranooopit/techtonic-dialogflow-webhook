"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/coverage", function(req, res) {
  var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.client
      ? req.body.queryResult.parameters.client
      : "Seems like some problem. Please Try again..";
  return res.json({
    fulfillmentText: speech,
    fulfillmentMessages: [{text: { text: [speech]}}],
    source: "techtonic-dialogflow-webhook"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("***** Server up and listening *****");
});
