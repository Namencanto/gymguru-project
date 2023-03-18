const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  let authHeader = req.cookies["jwt"];

  authHeader = "Bearer " + authHeader;

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  //13:50 seceret
  jwt.verify(token, "process.env.TOKEN_SECRET", (err, user) => {
    console.log(err);
    if (err) return res.redirect("/logout");
    req.user = user;
    next();
  });
}
// res.sendStatus(403)
function generateAccessToken(email) {
  return jwt.sign({ data: email }, "process.env.TOKEN_SECRET", {
    expiresIn: "1h",
  });
}

module.exports = {
  authenticateToken,
  generateAccessToken,
};
