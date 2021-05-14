"use strict";

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.post("/", userController.RegisterUser);
router.get("/:id", userController.GetUserById);
router.put("/:id", userController.UpdateUser);

module.exports = router;
