const bcrypt = require("bcryptjs");
const userServices = require("../services/users.services.js");
const User = require("../models/user.model");

/**
 * 1. To secure the password, we are using the bcryptjs, It stores the hashed password in the database.
 * 2. In the SignIn API, we are checking whether the assigned and retrieved passwords are the same or not using the bcrypt.compare() method.
 * 3. In the SignIn API, we set the JWT token expiration time. Token will be expired within the defined duration.
 */
exports.register = (req, res, next) => {
  const { password } = req.body;

  const salt = bcrypt.genSaltSync(10);

  req.body.password = bcrypt.hashSync(password, salt);

  userServices.register(req.body, (error, results) => {
    if (error) {
      return next(error);
    }

    if (!req.cookies["registerSuccesfull"]) {
      let options = {
        maxAge: 1000 * 10, // would expire after 10 seconds
        httpOnly: false, // The cookie only accessible by the web server
        signed: false, // Indicates if the cookie should be signed
      };

      // Set cookie
      res.cookie("registerSuccesfull", "hi", options); // options is optional
    }

    return res.redirect("/");
  });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  userServices.login({ email, password }, (error, results) => {
    if (error) {
      return next(error);
    }
    if (!req.cookies["jwt"]) {
      let options = {
        maxAge: 1000 * 60 * 60, // would expire after 1 hour
        httpOnly: true, // The cookie only accessible by the web server
        signed: false, // Indicates if the cookie should be signed
      };

      // Set cookie
      res.cookie("jwt", results.token, options); // options is optional
    }

    return res.redirect("/account");
  });
};

exports.userDelete = (req, res, next) => {
  const { email, password } = req.body;

  userServices.userDelete({ email, password }, (error, results) => {
    if (error) {
      return next(error);
    }
    if (req.cookies["jwt"]) {
      res.clearCookie("jwt");
    }
    if (!error) {
      return res.redirect("/");
    }
  });
};

exports.userUpdate = (req, res, next) => {
  const { email, password } = req.body;
  let { newPassword, newEmail, userName, surName, userAvatar } = req.body;

  //Guard classes
  if (newEmail === "") {
    newEmail = email;
  }
  if (newPassword === "") {
    newPassword = password;
  }
  if (userName === "") {
    userName = "John";
  }
  if (surName === "") {
    surName = "Doe";
  }
  if (userAvatar === "") {
    userAvatar = "https://static.thenounproject.com/png/4035892-200.png";
  }
  //

  let salt = bcrypt.genSaltSync(10);
  newPassword = bcrypt.hashSync(newPassword, salt);

  userServices.userUpdate(
    { email, password, newEmail, newPassword, userName, surName },
    (error, results) => {
      console.log(results);
      if (error) {
        return next(error);
      }
      if (!error) {
        exports.logoutInfo = "update";
        return res.redirect("/logout");
      }
    }
  );
};

exports.userProfile = (req, res, next) => {
  return res.status(401).json({ message: "Authorized User!!" });
};
