const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/user/register", userController.register);
router.post("/user/login", userController.login);

module.exports = router;