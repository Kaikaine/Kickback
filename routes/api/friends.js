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

router.post(
    "/add/:username",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
  
      User.find({username: req.body.username})
        .then(user => {
          User.find({username: req.user.username})
          .then(user2 => {
              if(user2.pending.includes(user.username)) {
                  user2.friends.push(req.body.username)
                  user.friends.push(req.user.username)
                //   remove user from pending array
                // save user and user2
                const removeIndex = user.pending
                .map(pending => pending.username)
                .indexOf(req.body.username)

                user.pending.splice(removeIndex,1)
                user2.save()
                user.save().then(res.json(user))
                
              } else {
                const newFriend = {
                  username: req.user.username
                }
                user2.pending.push(newFriend)
                user2.save().then(res.json(user2))
              }
          })
        })
        .catch(err => console.log(err));
    }
  );

module.exports = router;
