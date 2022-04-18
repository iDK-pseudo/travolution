const argon = require("argon2");
const User = require("../models/User");
const { validationResult } = require("express-validator");

exports.signup = async (req, res) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    const { userName, emailId, password } = req.body;
    try {
      const hashedPassword = await argon.hash(password);

      const user = await User.create({
        userName,
        emailId,
        hashedPassword,
      });

      console.log(`User ${userName} created!!`);
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send(validationErrors);
  }
};
