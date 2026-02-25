const { loginService, registerService } = require("../services/auth.service");
const DatabaseService = require("../services/databaseService");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await loginService(email, password);
        res.json({ 
            token,
            dataSource: DatabaseService.getDataSource()
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await registerService(email, password, role);
        res.status(201).json({
            message: "User created",
            user,
            dataSource: DatabaseService.getDataSource()
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Demo Authentication Endpoints for Development
exports.demoLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginService(email, password);
    const user = await DatabaseService.findUserByEmail(email);
    
    res.json({
      success: true,
      message: "Demo login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role
      },
      dataSource: DatabaseService.getDataSource(),
      availableTestUsers: [
        { email: "john@example.com", password: "password123", role: "PM" },
        { email: "jane@example.com", password: "password123", role: "EMPLOYEE" },
        { email: "mike@example.com", password: "password123", role: "PM" }
      ]
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      message: err.message,
      availableTestUsers: [
        { email: "john@example.com", password: "password123", role: "PM" },
        { email: "jane@example.com", password: "password123", role: "EMPLOYEE" },
        { email: "mike@example.com", password: "password123", role: "PM" }
      ]
    });
  }
};

exports.demoRegister = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await registerService(email, password, role);
    res.status(201).json({
      success: true,
      message: "Demo user created successfully",
      user: {
        _id: user._id,
        email: user.email,
        role: user.role
      },
      dataSource: DatabaseService.getDataSource()
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      message: err.message 
    });
  }
};

exports.getDemoUsers = async (req, res) => {
  try {
    const users = await DatabaseService.findAllUsers();
    // Remove passwords from response for security
    const safeUsers = users.map(user => ({
      _id: user._id,
      email: user.email,
      role: user.role
    }));
    res.json({
      success: true,
      users: safeUsers,
      count: safeUsers.length,
      dataSource: DatabaseService.getDataSource(),
      testCredentials: [
        { email: "john@example.com", password: "password123", role: "PM" },
        { email: "jane@example.com", password: "password123", role: "EMPLOYEE" },
        { email: "mike@example.com", password: "password123", role: "PM" }
      ]
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};