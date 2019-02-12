const express = require("express");
const router = express.Router();
const passport = require("passport");
// Load user model
const User = require("../../models/User");
const Event = require("../../models/Event");
require("../../config/passport")(passport);

const validateFriendInput = require("../../validation/message");

// find by req.body.username
// added to list thru req.user.username

// @route   POST api/friends/add/:username
// @desc    Create message
// @access  private
router.post(
    "/add/:username",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      User.find({username: req.params.username})
        .then(user => {
          // console.log(user)
          // put second user in map function
          user.map(key => {
            // console.log(key.pending)
            User.find({username: req.user.username})
            .then(user2 => {
              // probably map here as well
              user2.map(key2 => {
                // key == user key2 == user2
                console.log(key.username)
                if(key2.pending.filter(user => (user.username == key.username))) {
                  key2.friends.push({username: req.params.username})
                  key.friends.push({username: req.user.username})
                //   remove user from pending array
                // save user and user2
                const removeIndex = key.pending
                .map(pending => pending.username)
                .indexOf(req.body.username)

                key.pending.splice(removeIndex,1)
                key2.save()
                key.save().then(res.json(key))
                
              } else {
                console.log(key2.pending.username)
                const newFriend = {
                  username: req.user.username
                }
                key2.pending.push(newFriend)
                key2.save().then(res.json(user2))
              }
              })
                
            })
            .catch(err => console.log(err));
          })
        })
        .catch(err => console.log(err));
    }
  );


// @route   GET api/friends/events/:username
// @desc    Get friends events
// @access  private


module.exports = router;
