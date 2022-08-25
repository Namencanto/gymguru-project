module.exports = {
  db: process.env.MONGODB_URI || "mongodb://localhost:27017/test2",
};

// const express = require("express");
// const app = express();
// const path = require("path");
// const router = express.Router();
// const ejs = require("ejs");
// // set the view engine to ejs
// app.set("view engine", "ejs");

// // use res.render to load up an ejs view file
// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", function (req, res) {
//   res.render(path.join(__dirname, "views/pages/index.ejs"), {
//     title: "your best gym",
//   });
// });

// app.get("/about", function (req, res) {
//   res.render(path.join(__dirname, "views/pages/about.ejs"), {
//     title: "about us",
//   });
// });
// app.get("/offert", function (req, res) {
//   res.render(path.join(__dirname, "views/pages/gym-offert.ejs"), {
//     title: "our offert",
//   });
// });
// // about page
// // app.get("/about", function (req, res) {
// //   res.render("pages/about");
// // });

// app.listen(process.env.PORT || 8080);
// console.log("Server is listening on port 8080");
