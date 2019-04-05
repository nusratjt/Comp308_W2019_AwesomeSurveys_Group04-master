let express = require('express');
let router = express.Router();

let jwt = require('jsonwebtoken');

let passport = require('passport');

let usersController = require('../controllers/users');

/* GET users listing. */
router.get('/', usersController.displayUsersPage);

module.exports = router;
