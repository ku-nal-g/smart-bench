const router = require("express").Router();
const controller = require("../controllers/employee.controller");
const { protect } = require("../middlewares/auth.middleware");

// Demo routes for development (public for testing)
router.get("/demo", controller.getDemoEmployees);
router.get("/demo/available", controller.getDemoAvailableEmployees);
router.post("/demo", controller.demoCreateEmployee);

module.exports = router;