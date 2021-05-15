"use strict";

const express = require("express");
const router = express.Router();
const classModuleController = require("../controllers/classModule-controller");

router.post("/", classModuleController.RegisterClassModule);
router.put("/:id", classModuleController.UpdateClassModule);
router.get("/:id", classModuleController.GetClassModuleById);
router.get("/", classModuleController.GetAllClassModules);
router.delete("/:id", classModuleController.DeleteClassModule);

module.exports = router;