const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./backend/config/db.config.js");
const auth = require("./backend/middlewares/auth.js");
const errors = require("./backend/middlewares/errors.js");
const unless = require("express-unless");
const path = require("path");

const app = express();

var userData = require("./Backend/controllers/users.controller");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// set the view engine to ejs
app.set("view engine", "ejs");

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connected");
    },
    (error) => {
      console.log("Database can't be connected: " + error);
    }
  );

// auth.authenticateToken.unless = unless;
// console.log(auth.authenticateToken);
// app.use(
//   auth.authenticateToken.unless({
//     path: [
//       { url: "/", methods: ["POST"] },
//       { url: "/users/login", methods: ["POST"] },
//       { url: "/users/register", methods: ["POST"] },
//       { url: "/users/otpLogin", methods: ["POST"] },
//       { url: "/users/verifyOTP", methods: ["POST"] },
//     ],
//   })
// );
// middleware for authenticating token submitted with requests
/**
 * Conditionally skip a middleware when a condition is met.
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// initialize routes
app.use("/users", require("./Backend/routes/users.routes.js"));

// middleware for error responses
app.use(errors.errorHandler);

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render(path.join(__dirname, "views/pages/index.ejs"), {
    title: "your best gym",
  });
});
app.get("/about", function (req, res) {
  res.render(path.join(__dirname, "views/pages/about.ejs"), {
    title: "about us",
  });
});
app.get("/offert", function (req, res) {
  res.render(path.join(__dirname, "views/pages/gym-offert.ejs"), {
    title: "our offert",
  });
});
app.get("/account", function (req, res) {
  // set jwt in cookie for auth user

  if (!req.cookies.jwt) {
    let options = {
      maxAge: 1000 * 60 * 15, // would expire after 15 minutes
      httpOnly: true, // The cookie only accessible by the web server
      signed: false, // Indicates if the cookie should be signed
    };

    // Set cookie
    res.cookie("jwt", userData.userData.token, options); // options is optional
  }
  // render page
  res.render(path.join(__dirname, "views/pages/account.ejs"), {
    title: "our offert",
    userData: userData.userData,
  });
  console.log(userData.userData);
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);

  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

// const User = require("./Backend/models/user.model");

// app.post("/", function (req, res, next) {
//   let newUser = new User({
//     email: res.body.email,
//     password: req.body.password,
//   });
//   res.status(500).json({ message: newUser });
// });

// this variable is for online hosting like heroku or our localhost:5000

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
