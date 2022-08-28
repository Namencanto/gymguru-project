const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./Backend/config/db.config.js");
const auth = require("./Backend/middlewares/auth.js");
const errors = require("./Backend/middlewares/errors.js");
const unless = require("express-unless");
const path = require("path");

const User = require("./Backend/models/user.model.js");
const jwt_decode = require("jwt-decode");

const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// set the view engine to ejs
app.set("view engine", "ejs");

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

// Secure with middleware user page
app.get("/account", auth.authenticateToken, function (req, res) {
  // Decoding token to get information about user
  let decodeToken = req.cookies["jwt"];
  let decodedEmail = jwt_decode(decodeToken).data;

  // Search token account in database
  User.findOne({ email: decodedEmail }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      // Render page and pass user data
      res.render(path.join(__dirname, "views/pages/account.ejs"), {
        title: "Welcome",
        userData: data,
      });
    }
  });
});

app.get("/logout", function (req, res) {
  res.render(path.join(__dirname, "views/pages/logout.ejs"), {
    title: "Session expired",
  });
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

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
app.listen(process.env.PORT || 8080);
console.log("Server is listening on port 8080");
