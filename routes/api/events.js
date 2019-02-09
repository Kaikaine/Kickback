const express = require("express");
const router = express.Router();
const passport = require("passport");
// Load user model
const User = require("../../models/User");
const Event = require("../../models/Event");
require("../../config/passport")(passport);

const validateEventInput = require("../../validation/message");

// @route   POST api/events/create
// @desc    Create message
// @access  private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateEventInput(req.body);

    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    User.findById(req.user.id)
      .then(user => {
        const newEvent = new Event({
          title: req.body.title,
          description: req.body.description,
          location: req.body.location
        });

        user.events.unshift(newEvent);

        user.save().then(user => res.json(user));
      })
      .catch(err => console.log(err));
  }
);

// @route   GET api/events
// @desc    Create message
// @access  private
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      // const { errors, isValid } = validateEventInput(req.body);
  
      // if (!isValid) {
      //   return res.status(400).json(errors);
      // }
  
      User.findById(req.user.id)
        .then(user => {
           res.json(user.events);
        })
        .catch(err => console.log(err));
    }
  );

module.exports = router;
