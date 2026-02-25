const { isMockMode, mockUserService, mockProjectService, mockEmployeeService } = require('./mockService');

let User, Project, Employee;

try {
  User = require('../models/User');
  Project = require('../models/Project');
  Employee = require('../models/Employee');
} catch (error) {
  console.log('Note: Mongoose models loaded for database mode');
}

class DatabaseService {
  
  static async findUserByEmail(email) {
    if (isMockMode()) {
      return await mockUserService.findByEmail(email);
    }
    return await User.findOne({ email });
  }

  static async findUserById(id) {
    if (isMockMode()) {
      return await mockUserService.findById(id);
    }
    return await User.findById(id);
  }

  static async createUser(userData) {
    if (isMockMode()) {
      return await mockUserService.create(userData);
    }
    const user = new User(userData);
    return await user.save();
  }

  static async findAllUsers() {
    if (isMockMode()) {
      return await mockUserService.findAll();
    }
    return await User.find();
  }

  static async updateUser(id, updateData) {
    if (isMockMode()) {
      return await mockUserService.updateById(id, updateData);
    }
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async deleteUser(id) {
    if (isMockMode()) {
      return await mockUserService.deleteById(id);
    }
    return await User.findByIdAndDelete(id);
  }

  static async findAllProjects(filter = {}) {
    if (isMockMode()) {
      return await mockProjectService.findAll(filter);
    }
    return await Project.find(filter);
  }

  static async findProjectById(id) {
    if (isMockMode() || !Project) {
      return await mockProjectService.findById(id);
    }
    
    try {
      return await Project.findById(id);
    } catch (error) {
      if (error.name === 'CastError' || error.message.includes('Cast to ObjectId failed')) {
        return await mockProjectService.findById(id);
      }
      throw error;
    }
  }

  static async createProject(projectData) {
    if (isMockMode()) {
      return await mockProjectService.create(projectData);
    }
    const project = new Project(projectData);
    return await project.save();
  }

  static async updateProject(id, updateData) {
    if (isMockMode()) {
      return await mockProjectService.updateById(id, updateData);
    }
    return await Project.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async deleteProject(id) {
    if (isMockMode()) {
      return await mockProjectService.deleteById(id);
    }
    return await Project.findByIdAndDelete(id);
  }

  static async findAllEmployees(filter = {}) {
    if (isMockMode()) {
      return await mockEmployeeService.findAll(filter);
    }
    return await Employee.find(filter);
  }

  static async findEmployeeById(id) {
    if (isMockMode() || !Employee) {
      return await mockEmployeeService.findById(id);
    }
    
    try {
      return await Employee.findById(id);
    } catch (error) {
      if (error.name === 'CastError' || error.message.includes('Cast to ObjectId failed')) {
        return await mockEmployeeService.findById(id);
      }
      throw error;
    }
  }

  static async createEmployee(employeeData) {
    if (isMockMode()) {
      return await mockEmployeeService.create(employeeData);
    }
    const employee = new Employee(employeeData);
    return await employee.save();
  }

  static async updateEmployee(id, updateData) {
    if (isMockMode()) {
      return await mockEmployeeService.updateById(id, updateData);
    }
    return await Employee.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async deleteEmployee(id) {
    if (isMockMode()) {
      return await mockEmployeeService.deleteById(id);
    }
    return await Employee.findByIdAndDelete(id);
  }

  static async findEmployeesBySkills(skills) {
    if (isMockMode()) {
      const employees = await mockEmployeeService.findAll();
      return employees.filter(emp => 
        skills.some(skill => emp.skills.includes(skill))
      );
    }
    return await Employee.find({ 
      skills: { $in: skills } 
    });
  }

  static async findAvailableEmployees() {
    if (isMockMode()) {
      return await mockEmployeeService.findAll({ status: 'Bench' });
    }
    return await Employee.find({ status: 'Bench' });
  }

  static async findProjectsByBudgetRange(minBudget, maxBudget) {
    if (isMockMode()) {
      const projects = await mockProjectService.findAll();
      return projects.filter(project => 
        project.budget >= minBudget && project.budget <= maxBudget
      );
    }
    return await Project.find({
      budget: { $gte: minBudget, $lte: maxBudget }
    });
  }

  static isUsingMockData() {
    return isMockMode();
  }

  static getDataSource() {
    return (isMockMode() || !Employee) ? 'Mock Data' : 'MongoDB';
  }
}

module.exports = DatabaseService;