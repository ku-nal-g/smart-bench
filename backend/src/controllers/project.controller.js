const { matchEmployees } = require("../services/project.service");
const DatabaseService = require("../services/databaseService");

// Demo endpoint for development
exports.getDemoProjects = async (req, res) => {
  try {
    const projects = await DatabaseService.findAllProjects();
    res.json({
      success: true,
      projects,
      count: projects.length,
      dataSource: DatabaseService.getDataSource(),
      note: "Demo data for development - no authentication required"
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// Demo project creation for development
exports.demoCreateProject = async (req, res) => {
  try {
    const projectData = {
      name: req.body.name || "Demo Project",
      requiredSkills: req.body.requiredSkills || ["JavaScript", "Node.js"],
      budget: req.body.budget || 25000
    };
    const project = await DatabaseService.createProject(projectData);
    // Ensure id is available (handle both _id and id field)
    const projectWithId = {
      ...project,
      id: project.id || project._id
    };
    res.status(201).json({
      success: true,
      message: "Demo project created successfully",
      project: projectWithId,
      dataSource: DatabaseService.getDataSource()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// Demo matching for development
exports.demoMatch = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const projectId = req.params.id;
    
    const result = await matchEmployees(
      projectId,
      parseInt(page),
      parseInt(limit)
    );

    const response = result.data.map(emp => ({
      ...emp,
      dailyLoss: emp.hourlyRate * 8, // Show for demo purposes (8 hours/day)
      matchedSkills: emp.matchedSkills
    }));

    res.json({
      success: true,
      total: result.total,
      data: response,
      dataSource: DatabaseService.getDataSource(),
      note: "Demo matching - showing daily loss for all users"
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// Core Matchmaker API - Protected route with role-based access
exports.match = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const result = await matchEmployees(
            req.params.id,
            parseInt(page),
            parseInt(limit)
        );

        // Apply role-based access control for Daily Loss calculation
        const response = result.data.map(emp => ({
            id: emp.id,
            name: emp.name,
            skills: emp.skills,
            hourlyRate: emp.hourlyRate,
            status: emp.status,
            matchedSkills: emp.matchedSkills,
            // Only PM role can see the Daily Loss calculation
            dailyLoss: req.user.role === "PM" ? emp.hourlyRate * 8 : undefined
        }));

        res.json({
            success: true,
            total: result.total,
            data: response,
            dataSource: DatabaseService.getDataSource(),
            message: req.user.role === "PM" 
                ? "Showing daily loss calculation (PM access)" 
                : "Daily loss hidden (non-PM user)"
        });
    } catch (error) {
        res.status(500).json({ 
          success: false,
          error: error.message 
        });
    }
};