const argon = require("argon2");
const User = require("../models/User");
const { validationResult } = require("express-validator");

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
      res.send({'status':202,'message':'User created..','name':name});
    } catch (error) {
      res.send({'status':500,'message':error.message,'name':name});
      console.log(error);
    }
  } else {
    res.send({'status':500,'message':validationErrors,'name':name});
  }
};

exports.signIn = async (req, res) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    const { emailId, password } = req.body;
    try {
      const user = await User.findOneByEmailId(emailId)

      if(await argon.verify(user[0].hashedPassword, password))
        res.send({ 'status': 202, 'name': user[0].name, 'message': 'user found !' })
      else
        res.send({ 'status': 204, 'name': 'N/A', 'message': 'user not found !' })

    } catch (error) {
      res.send({ 'status': 500, 'message': error.message });
      console.log(error);
    }
  } else {
    res.send({ 'status': 500, 'message': validationErrors });
  }
};
