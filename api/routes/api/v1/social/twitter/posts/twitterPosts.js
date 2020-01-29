// jshint esversion: 8
// jshint node: true
"use strict";

const io = require("../../../../../../helpers/socket-io").io;
const {
    mongoSearch
} = require('../../../../../../helpers/twitter/search');


const {getTweetFromMongo} = require('../../../../../../helpers/mongo/tweets');


const postMongoSearch = async function (req, res) {
    io.emit("requestStatus", {
      id: req.id,
      message: "Received."
    });
    const filter = req.body.filter;
    const bbox = req.body.bbox;
    const extremeWeatherEvents = req.body.weatherEvents;


    const result = await mongoSearch(filter, bbox, extremeWeatherEvents);
    io.emit("requestStatus", {
      id: req.id,
      message: "Sending result."
    });

    if (result.error) {
        res.status(result.error.code).send({
            message: result.error.message
        });
    } else {
        const result2 = {tweets: result};
        console.log("sending result");
        res.status(200).json(result2);
    }

};


const postMongoSearchById = async function (req, res) {
    io.emit("requestStatus", {
      id: req.id,
      message: "Received."
    });
    const filter = req.body.filter;
    const bbox = req.body.bbox;
    const extremeWeatherEvents = req.body.weatherEvents;
    const id = req.params.tweetId;


    const result = await getTweetFromMongo(filter, bbox, extremeWeatherEvents, id, req.id);
    io.emit("requestStatus", {
      id: req.id,
      message: "Sending result."
    });

    if (result.error) {
        res.status(result.error.code).send({
            message: result.error.message
        });
    } else {
        console.log("sending result");
        res.status(200).json({tweet: result});
    }
};


module.exports = {
    postMongoSearchById,
    postMongoSearch
};
