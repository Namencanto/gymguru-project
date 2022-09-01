const usersController = require("../controllers/users.controller");

const express = require("express");
const router = express.Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.delete("/userDelete", usersController.userDelete);
router.put("/userUpdate", usersController.userUpdate);
router.get("/user-Profile", usersController.userProfile);

module.exports = router;
