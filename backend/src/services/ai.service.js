exports.skillGapAnalysis = (employeeSkills, projectSkills) => {
  const missingSkills = projectSkills.filter(
    skill => !employeeSkills.includes(skill)
  );

  if (missingSkills.length === 0) {
    return "Fully Project Ready";
  }

  // Simulating AI intelligence: prioritize most demanded skill
  return missingSkills[0];
};