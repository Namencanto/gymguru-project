function errorHandler(err, req, res, next) {
  let maxAge = {
    maxAge: 1000 * 10, // would expire after 10 seconds
  };

  // DEFINED ERRORS

  // LOGIN ERRORS
  if (err.message === "user validation failed: email: Email already in use.") {
    // form error when email is already used, cookie is used to give information about email is used to frontend
    // Set cookie
    res.cookie("emailInUse", ".", maxAge);
    return res.redirect("/");
  }
  if (
    err.message === "user validation failed: phoneNumber: Email already in use."
  ) {
    res.cookie("NumberInUse", ".", maxAge);
    return res.redirect("/");
  }
  if (err.message === "Invalid Email/Password!") {
    // Set cookie
    res.cookie("invalidLoginPassword", ".", maxAge);
    return res.redirect("/");
  }

  // ACCOUNT ERRORS
  if (err.message === "Account Invalid Email/Password!") {
    // Set cookie
    res.clearCookie("phoneDuplicate");
    res.clearCookie("emailDuplicate");
    res.clearCookie("invalidAccountPassword");
    res.clearCookie("invalidImgFile");

    res.cookie("accountInvalid", ".", maxAge);
    res.cookie("invalidAccountPassword", ".", maxAge);
    return res.redirect("/account");
  }

  if (err.message === "Delete Invalid Email/Password!") {
    // Set cookie
    res.cookie("accountInvalid", ".", maxAge);
    res.cookie("invalidDeleteAccountPassword", ".", maxAge);
    return res.redirect("/account");
  }

  // OTHER UNDEFINED ERRORS
  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "Token not valid" });
  }
  if (err.name === "ValidationError") {
    // mongoose validation error
    return res.status(400).json({ message: err.message });
  }
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ message: err });
  }
  // default to 500 server error
  return res.status(500).json({ message: err.message });
}
module.exports = {
  errorHandler,
};
