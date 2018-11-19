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
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.client
      ? req.body.result.parameters.client
      : "Seems like some problem. Please Try again..";
  return res.json({
    fulfillmentText: speech,
    fulfillmentMessages: [
      {
        text: {
          text: [
            speech
          ]
        }
      }],
    source: "techtonic-dialogflow-webhook"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("***** Server up and listening *****");
});
