const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./Backend/config/db.config.js");
const auth = require("./Backend/middlewares/auth.js");
const errors = require("./Backend/middlewares/errors.js");
const path = require("path");

const { unlink } = require("node:fs");

//upload image
// const upload = require("./Backend/middlewares/upload.js");
//
const User = require("./Backend/models/user.model.js");
// const File = require("./Backend/middlewares/upload.js");

// import multer storage
const { upload } = require("./Backend/middlewares/multerLogic.js");

const jwt_decode = require("jwt-decode");

const app = express();

const controller = require("./Backend/controllers/users.controller");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

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

let cookie = false;
app.use((req, res, next) => {
  if (req.cookies["jwt"]) {
    cookie = true;
  } else cookie = false;
  next();
});

app.get("/", function (req, res) {
  res.render(path.join(__dirname, "views/pages/index.ejs"), {
    title: "your best gym",
    cookie: cookie,
  });
});
app.get("/about", function (req, res) {
  res.render(path.join(__dirname, "views/pages/about.ejs"), {
    title: "about us",
    cookie: cookie,
  });
});
app.get("/offert", function (req, res) {
  res.render(path.join(__dirname, "views/pages/gym-offert.ejs"), {
    title: "our offert",
    cookie: cookie,
  });
});

// Secure with middleware user page
app.get("/account", auth.authenticateToken, async function (req, res) {
  // Decoding token to get information about user
  let decodeToken = req.cookies["jwt"];
  let decodedEmail = jwt_decode(decodeToken).data;

  // Search token account in database
  User.findOne({ email: decodedEmail }, async (error, data) => {
    if (error) {
      console.log(error);
    } else {
      // Render page and pass user data
      res.render(path.join(__dirname, "views/pages/account.ejs"), {
        title: "Welcome",
        userData: data,
        avatar: "avatar",
        cookie: true,
      });
      // });
    }
  });
});

app.get("/logout", function (req, res) {
  res.clearCookie("jwt");
  res.render(path.join(__dirname, "views/pages/logout.ejs"), {
    title: "Session expired",
    cookie: false,
    logoutInfo: controller.logoutInfo,
  });
  controller.logoutInfo = null;
});

app.post("/upload", upload.single("avatarek"), async function (req, res, next) {
  const { multerError } = require("./Backend/middlewares/multerLogic.js");
  if (multerError === true) {
    let maxAge = {
      maxAge: 1000 * 10, // would expire after 10 seconds
    };
    res.clearCookie("phoneDuplicate");
    res.clearCookie("emailDuplicate");
    res.clearCookie("invalidAccountPassword");

    res.cookie("accountInvalid", ".", maxAge);
    res.cookie("invalidImgFile", ".", maxAge);
    return res.redirect("/account");
  }

  if (!req.cookies["jwt"]) {
    return res.redirect("/logout");
  }
  let decodeToken = req.cookies["jwt"];
  let decodedEmail = jwt_decode(decodeToken).data;
  const checkAvatarUser = await User.findOne({ email: decodedEmail });
  console.log(checkAvatarUser.avatar);
  if (
    checkAvatarUser.avatar !==
    "https://static.thenounproject.com/png/4035892-200.png"
  ) {
    unlink(`public/${checkAvatarUser.avatar}`, (err) => {
      if (err) return next(err);
      console.log("was deleted");
    });
  }

  try {
    const newFile = await User.updateOne(
      {
        email: decodedEmail,
      },
      { avatar: req.file.filename }
    );
    res.redirect("/account");
  } catch (error) {
    res.json({
      error,
    });
  }
});

// app.post("/users/login", async (req, res) => {
//   const user = users.find((user) => user.name === req.body.name);

//   if (user == null) {
//     return res.status(400).send("Cannot find user");
//   }
//   try {
//     if (await bcrypt.compare(req.body.password, user.password)) {
//       res.send("Success");
//     } else {
//       res.send("Not Allowed");
//     }
//   } catch {
//     res.status(500).send();
//   }
// });

app.get("*", function (req, res, next) {
  res.render(path.join(__dirname, "views/pages/404error.ejs"), {
    title: "This page not exist",
  });
});

// this variable is for online hosting like heroku or our localhost:5000

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
app.listen(process.env.PORT || 8080);
console.log("Server is listening on port 8080");
