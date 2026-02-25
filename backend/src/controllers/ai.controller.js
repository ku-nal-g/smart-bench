const { skillGapAnalysis } = require("../services/ai.service");
const DatabaseService = require("../services/databaseService");

exports.getSkillSuggestion = async (req, res) => {
  try {
    const { employeeId, projectId } = req.params;

    // Get employee and project using DatabaseService
    const employee = await DatabaseService.findEmployeeById(employeeId);
    const project = await DatabaseService.findProjectById(projectId);

    if (!employee || !project) {
      return res.status(404).json({ 
        message: "Employee or Project not found"
      });
    }

    const suggestion = skillGapAnalysis(
      employee.skills,
      project.requiredSkills
    );

    res.json({ 
      suggestion,
      employee: employee.name,
      project: project.name
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};