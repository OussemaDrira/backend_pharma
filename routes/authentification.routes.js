var express = require('express');
var router = express.Router();
const db = require('../db/config.js')

var {login,register}=require("../models/authentification.models.js")

/***
* @route Get api/auth/login
* @desc Login user
*/
router.post("/login",db.login);
/**
* @route POST api/auth/register
* @desc Register new user
* @access Public
*/
router.post("/register",db.register);
module.exports = router;