const DatabaseService = require("./databaseService");

exports.matchEmployees = async (projectId, page, limit) => {
  const project = await DatabaseService.findProjectById(projectId);
  if (!project) throw new Error("Project not found");

  const employees = await DatabaseService.findAvailableEmployees();

  // Filter employees with at least 2 matching skills
  const filtered = employees.filter(emp => {
    const matchedSkills = emp.skills.filter(skill =>
      project.requiredSkills.includes(skill)
    );
    return matchedSkills.length >= 2;
  }).map(emp => {
    // Add matched skills to the employee object and ensure id field
    const matchedSkills = emp.skills.filter(skill =>
      project.requiredSkills.includes(skill)
    );
    return {
      ...emp,
      id: emp.id || emp._id, // Ensure id field is available
      matchedSkills
    };
  });

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return {
    total: filtered.length,
    data: paginated
  };
};