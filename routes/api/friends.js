const express = require("express");
const router = express.Router();
const passport = require("passport");
// Load user model
const User = require("../../models/User");
const Event = require("../../models/Event");
require("../../config/passport")(passport);

const validateEventInput = require("../../validation/message");

// find by req.body.username
// added to list thru req.user.username



module.exports = router;
