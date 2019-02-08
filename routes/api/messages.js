const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// Load user model
const User = require("../../models/User");
const Message = require("../../models/Message");
require("../../config/passport")(passport);

const validateMessageInput = require("../../validation/message");

// @route   POST api/message/:from_id/:to_id
// @desc    Create message
// @access  private
router.post("/:from_id/:to_id", (req, res) => {
  const { errors, isValid } = validateMessageInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findById(req.params.to_id)
  .then(user => {
    const newMessage = new Message({
        to: req.params.to_id,
        from: req.params.from_id,
        message: req.body.message
    })

      user.messages.push(newMessage)

      user.save()
  })

  User.findById(req.params.from_id)
  .then(user => {
      const newMessage = new Message({
          to: req.params.to_id,
          from: req.params.from_id,
          message: req.body.message
      })

      user.messages.push(newMessage)

      user.save().then(user => res.json(user))
  })
});

// @route   GET api/message/:from_id/:to_id
// @desc    Create message
// @access  private

router.get("/:from_id/:to_id", (req, res) => {
    const { errors, isValid } = validateMessageInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }


})

module.exports = router;
