function errorHandler(err, req, res, next) {
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === "ValidationError") {
    // mongoose validation error
    if (err.message == "user validation failed: email: Email already in use.") {
      // form error when email is already used, cookie is used to give information about email is used to frontend
      let maxAge = {
        maxAge: 1000 * 10, // would expire after 10 seconds
      };
      // Set cookie
      res.cookie("emailInUse", "hi", maxAge);
      return res.redirect("/");
    }
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "Token not valid" });
  }

  if (err.message == "Invalid Email/Password!") {
    // form error when email is already used, cookie is used to give information about email is used to frontend
    let maxAge = {
      maxAge: 1000 * 10, // would expire after 10 seconds
    };
    // Set cookie
    res.cookie("invalidLoginPassword", "hi", maxAge);
    return res.redirect("/");
  }
  if (err.message == "Account Invalid Email/Password!") {
    let maxAge = {
      maxAge: 1000 * 10, // would expire after 10 seconds
    };
    // Set cookie
    res.cookie("invalidAccountPassword", "hi", maxAge);
    return res.redirect("/account");
  }

  if (err.message == "Delete Invalid Email/Password!") {
    let maxAge = {
      maxAge: 1000 * 10, // would expire after 10 seconds
    };
    // Set cookie
    res.cookie("invalidDeleteAccountPassword", "hi", maxAge);
    return res.redirect("/account");
  }
  // default to 500 server error
  return res.status(500).json({ message: err.message });
}

module.exports = {
  errorHandler,
};
