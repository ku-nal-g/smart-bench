const router = require("express").Router();
const controller = require("../controllers/auth.controller");

// Production Authentication routes
router.post("/login", controller.login);
router.post("/register", controller.register);

// Demo routes for development (public for testing)
router.post("/demo/login", controller.demoLogin);
router.post("/demo/register", controller.demoRegister);
router.get("/demo/users", controller.getDemoUsers);

module.exports = router;