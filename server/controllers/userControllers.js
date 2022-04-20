const argon = require("argon2");
const User = require("../models/User");
const Group = require("../models/Group");
const { validationResult } = require("express-validator");
const passport = require("passport");

exports.signup = async (req, res) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    const { name, emailId, password } = req.body;
    try {
      const hashedPassword = await argon.hash(password);

      const user = await User.create({
        name,
        emailId,
        hashedPassword,
      });

      console.log(`User ${name} created!!`);
      res.send({ status: 202, message: "User created..", name: name });
    } catch (error) {
      res.send({ status: 500, message: error.message, name: name });
      console.log(error);
    }
  } else {
    res.send({ status: 500, message: validationErrors });
  }
};

exports.signin = async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    try {
      passport.authenticate("local", (err, user, message) => {
        if (!user) {
          return res.send({ status: 500, message });
        }

        req.logIn(user, (error) => {
          if (error) {
            return next(error);
          }

          return res.send({ status: 200, user, message });
        });
      })(req, res, next);
    } catch (error) {
      res.send({ status: 500, message: error.message });
      console.log(error);
    }
  } else {
    res.send({ status: 500, message: validationErrors });
  }
};

exports.createGroup = async (req, res) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    const { userId, groupName } = req.body;

    try {
      const user = await User.findById(userId);
      if (user) {
        const group = await Group.create({
          groupName,
          memberIds: [user],
        });
        res.send({
          status: 202,
          message: "Group created..",
          groupId: group._id,
        });
      } else {
        res.send({ status: 500, message: "Invalid User" });
      }
    } catch (error) {
      res.send({ status: 500, message: error.message });
      console.log(error);
    }
  } else {
    res.send({ status: 500, message: validationErrors });
  }
};
