"use strict";

const express = require("express");
const router = express.Router();
const videoLeassonController = require("../controllers/videoLeassons-controller");

router.post("/", videoLeassonController.RegisterVideoLeasson);
router.put("/:id", videoLeassonController.UpdateVideoLeasson);
router.get("/:id", videoLeassonController.GetVideoLeassonById);
router.get("/module/:id", videoLeassonController.GetAllVideoLeassonsFromModule);
router.delete("/:id", videoLeassonController.DeleteVideoLeasson);

module.exports = router;
