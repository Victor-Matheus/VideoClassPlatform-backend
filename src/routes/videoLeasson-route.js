"use strict";

const express = require("express");
const router = express.Router();
const authService = require("../auth");
const videoLeassonController = require("../controllers/videoLeassons-controller");

router.post(
  "/",
  authService.authorize,
  videoLeassonController.RegisterVideoLeasson
);
router.put(
  "/:id",
  authService.authorize,
  videoLeassonController.UpdateVideoLeasson
);
router.get(
  "/:id",
  authService.authorize,
  videoLeassonController.GetVideoLeassonById
);
router.get(
  "/module/:id",
  authService.authorize,
  videoLeassonController.GetAllVideoLeassonsFromModule
);
router.delete(
  "/:id",
  authService.authorize,
  videoLeassonController.DeleteVideoLeasson
);

module.exports = router;
