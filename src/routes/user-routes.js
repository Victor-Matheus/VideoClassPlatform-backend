"use strict";

const express = require("express");
const router = express.Router();
const authService = require("../auth");
const userController = require("../controllers/user-controller");

router.post("/authenticate", userController.authenticate);
router.post("/", userController.RegisterUser);
router.put("/:id", authService.authorize, userController.UpdateUser);
router.get("/:id", authService.authorize, userController.GetUserById);
router.get("/", authService.authorize, userController.GetAllUsers);
router.delete("/:id", authService.authorize, userController.DeleteUser);

module.exports = router;
