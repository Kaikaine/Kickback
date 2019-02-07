const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// Load user model
const User = require("../../models/User");
require("../../config/passport")(passport);

// route    POST api/users/register
// desc     register a user
// access   public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status.json(errors);
  }

  User.findOne({ username: req.body.email }).then(user => {
    if (user) {
      errors.username = "Username already taken";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password
      });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            res.json(user);
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
  });
});

// route    GET api/users/login
// desc     Login user / return jwt token
// access   public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username })
    .then(user => {
      // check
      if (!user) {
          errors.username = 'User not found'
        return res.status(404).json(errors);
      }

      // check password
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched

          const payload = {
            id: user._id,
            name: user.username,
          };

          // Sign token
          jwt.sign(payload, keys.secret, { expiresIn: 7200 }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        } else {
            errors.password = "Password incorrect"
          return res.status(400).json(errors);
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
