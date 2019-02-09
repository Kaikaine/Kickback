const express = require("express");
const router = express.Router();
const passport = require("passport");
// Load user model
const User = require("../../models/User");
const Message = require("../../models/Message");
require("../../config/passport")(passport);

const validateMessageInput = require("../../validation/message");

// @route   POST api/message/:from_id/:to_id
// @desc    Create message
// @access  private
router.post("/:from_name/:to_name", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateMessageInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.find({username: req.params.to_id})
  .then(user => {
    const newMessage = new Message({
        to: req.params.to_name,
        from: req.params.from_name,
        message: req.body.message
    })

      user.messages.push(newMessage)

      user.save()
  })

  User.find({username: req.params.from_name})
  .then(user => {
      const newMessage = new Message({
          to: req.params.to_name,
          from: req.params.from_name,
          message: req.body.message
      })

      user.messages.push(newMessage)

      user.save().then(user => res.json(user))
  })
});

// @route   GET api/message/:from_id/:to_id
// @desc    Create message
// @access  private

router.get("/:from_id/:to_id", passport.authenticate("jwt", { session: false }), (req, res) => {
    
    // find user by req.params.from_id
    // go thru user.messages
    // same if statements as before
    
    const messages = []

    User.findById(req.params.from_id)
    .then(user => {
        // console.log(user)
        user.messages.forEach(msg => {
            if (msg.to === req.params.to_id || msg.to === req.params.from_id) {
                if (msg.from === req.params.to_id || msg.from === req.params.from_id) {
                    messages.push(msg)
                }
            }
        })
        res.json(messages)
    })
    .catch(err => console.log(err))
})

module.exports = router;