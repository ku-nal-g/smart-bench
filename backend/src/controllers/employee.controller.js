const DatabaseService = require("../services/databaseService");

// Demo endpoints for development
exports.getDemoEmployees = async (req, res) => {
  try {
    const employees = await DatabaseService.findAllEmployees();
    res.json({
      success: true,
      employees,
      count: employees.length,
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

exports.getDemoAvailableEmployees = async (req, res) => {
  try {
    const availableEmployees = await DatabaseService.findAvailableEmployees();
    res.json({
      success: true,
      availableEmployees,
      count: availableEmployees.length,
      dataSource: DatabaseService.getDataSource(),
      note: "Demo available employees (status: 'Bench')"
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// Demo employee creation for development
exports.demoCreateEmployee = async (req, res) => {
  try {
    const employeeData = {
      name: req.body.name || "Demo Employee",
      skills: req.body.skills || ["JavaScript", "React"],
      hourlyRate: req.body.hourlyRate || 75,
      status: req.body.status || "Bench"
    };
    const employee = await DatabaseService.createEmployee(employeeData);
    // Ensure id is available (handle both _id and id field)
    const employeeWithId = {
      ...employee,
      id: employee.id || employee._id
    };
    res.status(201).json({
      success: true,
      message: "Demo employee created successfully",
      employee: employeeWithId,
      dataSource: DatabaseService.getDataSource()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};