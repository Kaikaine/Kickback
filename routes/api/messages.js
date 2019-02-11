const express = require("express");
const router = express.Router();
const passport = require("passport");
// Load user model
const User = require("../../models/User");
const Message = require("../../models/Message");
require("../../config/passport")(passport);

const validateMessageInput = require("../../validation/message");

// @route   POST api/message/:from_name/:to_name
// @desc    Create message
// @access  private
router.post("/:from_name/:to_name", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateMessageInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({username: req.params.to_name})
  .then(user => {
    const newMessage = new Message({
        to: req.params.to_name,
        from: req.params.from_name,
        message: req.body.message
    })

      user.messages.push(newMessage)

      user.save()
  })
  .catch(err => console.log(err))

  User.findOne({username: req.params.from_name})
  .then(user => {
      const newMessage = new Message({
          to: req.params.to_name,
          from: req.params.from_name,
          message: req.body.message
      })

      user.messages.push(newMessage)

      user.save().then(user => res.json(user))
  })
  .catch(err => console.log(err))
});

// @route   GET api/message/:from_name/:to_name
// @desc    Create message
// @access  private

router.get("/:from_name/:to_name", passport.authenticate("jwt", { session: false }), (req, res) => {
    
    // find user by req.params.from_name
    // go thru user.messages
    // same if statements as before
    
    const messages = []

    User.findOne({username: req.params.from_name})
    .then(user => {
        // console.log(user)
        user.messages.forEach(msg => {
            if (msg.to === req.params.to_name || msg.to === req.params.from_name) {
                if (msg.from === req.params.to_name || msg.from === req.params.from_name) {
                    messages.push(msg)
                }
            }
        })
        res.json(messages)
    })
    .catch(err => console.log(err))
})

module.exports = router;