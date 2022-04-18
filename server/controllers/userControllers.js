const argon = require("argon2");
const User = require("../models/User");

exports.signup = async (req, res) => {
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
};
