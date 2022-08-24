const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth.js");

async function login({ email, password }, callback) {
  const user = await User.findOne({ email });

  if (user != null) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = auth.generateAccessToken(email);

      // call toJSON method applied during model instantiation
      return callback(null, { ...user.toJSON(), token });
    } else {
      return callback({
        message: "Invalid Email/Password!",
      });
    }
  } else {
    return callback({
      message: "Invalid Email/Password!",
    });
  }
}

async function register(params, callback) {
  params.birthDate = params.birthDate.join("/");
  params.email = params.email.toLowerCase();
  if (params.email === undefined) {
    console.log(params.email);
    return callback({
      message: "email Required",
    });
  }

  const user = new User(params);
  user
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

module.exports = {
  login,
  register,
};
