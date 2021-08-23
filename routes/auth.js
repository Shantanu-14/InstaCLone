const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

router.post("/signup", (req, res) => {
  const { name, email, password, dp } = req.body;
  if (!password || !email || !name) {
    res.json({ error: "please add all the fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "Useralready exists with this email" });
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          name,
          email,
          password: hashedPassword,
          dp
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "Saved Successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "Please add email or password" });
  }
  User.findOne({ email: email })
    .then((SavedUser) => {
      if (!SavedUser) {
        return res.status(422).json({ error: "Invalid email or password " });
      }
      bcrypt
        .compare(password, SavedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            /* res.json({ message: "Sucessfully signed in" }); */
            const token = jwt.sign({ _id: SavedUser._id }, JWT_SECRET);
            const { _id, name, email, followers, following, dp } = SavedUser;
            res.json({ token, user: { _id, name, email, followers, following, dp } });
          } else {
            return res
              .status(422)
              .json({ error: "Invalid email or password " });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
});
