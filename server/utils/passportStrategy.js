const User = require("../models/User");
const argon = require("argon2");

const localStrategy = async (emailId, password, done) => {
  try {
    const user = await User.findOneByEmailId(emailId);
    if (user) {
      if (await argon.verify(user[0].hashedPassword, password)) {
        return done(null, user, "User Logged in!");
      } else {
        return done(null, false, { message: "Wrong Password" });
      }
    } else {
      return done(null, false, { message: "No user with this Email ID" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = localStrategy;
