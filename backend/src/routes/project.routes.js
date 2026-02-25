const router = require("express").Router();
const controller = require("../controllers/project.controller");
const { protect } = require("../middlewares/auth.middleware");

// Demo routes for development (public for testing)
router.get("/demo", controller.getDemoProjects);
router.post("/demo", controller.demoCreateProject);
router.get("/demo/:id/match", controller.demoMatch);

// Protected matchmaker API - core functionality
router.get("/:id/match", protect, controller.match);

module.exports = router;