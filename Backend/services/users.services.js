const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth.js");

async function login({ email, password }, callback) {
  email = email.toLowerCase();
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

async function userDelete({ email, password }, callback) {
  const user = await User.findOne({ email });

  if (user != null) {
    if (bcrypt.compareSync(password, user.password)) {
      await User.findOneAndDelete({ email });

      return callback(null, { ...user.toJSON() });
    } else {
      return callback({
        message: "Delete Invalid Email/Password!",
      });
    }
  } else {
    return callback({
      message: "Delete Invalid Email/Password!",
    });
  }
}
async function userUpdate(
  { email, password, newEmail, newPassword, newNumber, userName, surName },
  callback
) {
  const user = await User.findOne({ email });
  // console.log(user);
  if (user != null) {
    if (bcrypt.compareSync(password, user.password)) {
      await User.findOneAndUpdate(
        { email },
        {
          $set: {
            email: newEmail,
            password: newPassword,
            phoneNumber: newNumber,
            name: userName,
            surname: surName,
          },
        }
      );
      return callback(null, { ...user.toJSON() });
    } else {
      return callback({
        message: "Account Invalid Email/Password!",
      });
    }
  } else {
    return callback({
      message: "Account Invalid Email/Password!",
    });
  }
}

module.exports = {
  login,
  register,
  userDelete,
  userUpdate,
};
