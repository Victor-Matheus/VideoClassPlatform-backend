"use strict";

const express = require("express");
const router = express.Router();
const authService = require("../auth");
const classModuleController = require("../controllers/classModule-controller");

router.post(
  "/",
  authService.authorize,
  classModuleController.RegisterClassModule
);
router.put(
  "/:id",
  authService.authorize,
  classModuleController.UpdateClassModule
);
router.get(
  "/:id",
  authService.authorize,
  classModuleController.GetClassModuleById
);
router.get(
  "/",
  authService.authorize,
  classModuleController.GetAllClassModules
);
router.delete(
  "/:id",
  authService.authorize,
  classModuleController.DeleteClassModule
);

module.exports = router;
