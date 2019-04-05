let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

// create a reference to the db schema
let contactModel = require('../models/user');

module.exports.displayUsersPage = (req, res, next) => {
    res.send('respond with a resource');
  }