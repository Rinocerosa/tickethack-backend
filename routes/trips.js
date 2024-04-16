var express = require('express');
var router = express.Router();
require('../models/connection');
const Trip = require('../models/trips');
const moment = require('moment')


router.post("/", (req, res) => {
    Trip.find({departure: req.body.departure, arrival: req.body.arrival})
    .then(data => {res.json({ trips: data })});
});

module.exports = router