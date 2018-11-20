"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

let isNewRequest = false;

let chatbotInput = [];

restService.use(
    bodyParser.urlencoded({
        extended: true
    })
);

restService.use(bodyParser.json());

restService.get('/coverage/Poll.json', function (req, res) {
    let isAnotherRequest = isNewRequest;
    if(isAnotherRequest && (chatbotInput.length === 0 || chatbotInput[0] || chatbotInput[0] === null)){
        isNewRequest = false;
    }
    return res.json({
        chatBotInput: chatbotInput,
        isNewRequest: isAnotherRequest,
        source: "techtonic-dialogflow-webhook"
    });
});

restService.post("/coverage", function (req, res) {
    isNewRequest = true;
    var speech =
        req.body.result &&
        req.body.result.parameters &&
        req.body.result.parameters.client
            ? req.body.result.parameters.client
            : "Seems like some problem. Please Try again..";

    chatbotInput = [req.body.queryResult.parameters];
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

restService.listen(process.env.PORT || 8000, function () {
    console.log("***** Server up and listening *****");
});
