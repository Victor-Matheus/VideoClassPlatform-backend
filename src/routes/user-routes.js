"use strict";

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.post("/", userController.RegisterUser);
router.put("/:id", userController.UpdateUser);
router.get("/:id", userController.GetUserById);
router.get("/", userController.GetAllUsers);
router.delete("/:id", userController.DeleteUser);

module.exports = router;
