// jshint esversion: 6
// jshint node: true
"use strict";

const {getExtremeWeatherFromMongo} = require('../../../../../../helpers/mongo/extremeWeather');
const {bboxToPolygon} = require('../../../../../../helpers/geoJSON');
const io = require("../../../../../../helpers/socket-io").io;


/**
 * @desc retrieves the weatherExtreme events
 * @param {object} req request, containing information about the HTTP request
 * @param {object} res response, to send back the desired HTTP response
 */
const getExtremeWeather = function(req, res){
  io.emit("status", req.id + ": Recived")
  var polygon = bboxToPolygon(req.query.bbox);
  var events = req.query.events; // output: ['FOG', 'FROST']
  getExtremeWeatherFromMongo(polygon, events, res, req.id);
};

module.exports = {
  getExtremeWeather
};
