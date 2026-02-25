const router = require("express").Router();
const aiController = require("../controllers/ai.controller");

// AI skill gap analysis endpoint
router.get("/skill-gap/:employeeId/:projectId", aiController.getSkillSuggestion);

module.exports = router;