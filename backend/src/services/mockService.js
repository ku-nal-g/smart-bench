const { mockUsers, mockProjects, mockEmployees } = require('../config/mockData');

let isUsingMockData = false;

const simulateAsync = (data, delay = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

const mockUserService = {
  findByEmail: async (email) => {
    const user = mockUsers.find(u => u.email === email);
    return simulateAsync(user);
  },

  findById: async (id) => {
    const user = mockUsers.find(u => u._id === id);
    return simulateAsync(user);
  },

  create: async (userData) => {
    const newUser = {
      _id: generateId(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockUsers.push(newUser);
    return simulateAsync(newUser);
  },

  findAll: async () => {
    return simulateAsync(mockUsers);
  },

  updateById: async (id, updateData) => {
    const userIndex = mockUsers.findIndex(u => u._id === id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...updateData,
        updatedAt: new Date()
      };
      return simulateAsync(mockUsers[userIndex]);
    }
    return simulateAsync(null);
  },

  deleteById: async (id) => {
    const userIndex = mockUsers.findIndex(u => u._id === id);
    if (userIndex !== -1) {
      const deletedUser = mockUsers.splice(userIndex, 1)[0];
      return simulateAsync(deletedUser);
    }
    return simulateAsync(null);
  }
};

const mockProjectService = {
  findAll: async (filter = {}) => {
    let projects = mockProjects;
    
    if (filter.status) {
      projects = projects.filter(p => p.status === filter.status);
    }
    if (filter.createdBy) {
      projects = projects.filter(p => p.createdBy === filter.createdBy);
    }
    
    return simulateAsync(projects);
  },

  // Find project by ID
  findById: async (id) => {
    const project = mockProjects.find(p => p._id === id);
    return simulateAsync(project);
  },

  create: async (projectData) => {
    const newProject = {
      _id: generateId(),
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockProjects.push(newProject);
    return simulateAsync(newProject);
  },

  updateById: async (id, updateData) => {
    const projectIndex = mockProjects.findIndex(p => p._id === id);
    if (projectIndex !== -1) {
      mockProjects[projectIndex] = {
        ...mockProjects[projectIndex],
        ...updateData,
        updatedAt: new Date()
      };
      return simulateAsync(mockProjects[projectIndex]);
    }
    return simulateAsync(null);
  },

  deleteById: async (id) => {
    const projectIndex = mockProjects.findIndex(p => p._id === id);
    if (projectIndex !== -1) {
      const deletedProject = mockProjects.splice(projectIndex, 1)[0];
      return simulateAsync(deletedProject);
    }
    return simulateAsync(null);
  },

  findByUser: async (userId) => {
    const projects = mockProjects.filter(p => 
      p.assignedUsers.includes(userId) || p.createdBy === userId
    );
    return simulateAsync(projects);
  }
};

const mockEmployeeService = {
  // Find all employees
  findAll: async (filter = {}) => {
    let employees = mockEmployees;
    
    if (filter.department) {
      employees = employees.filter(e => e.department === filter.department);
    }
    if (filter.status) {
      employees = employees.filter(e => e.status === filter.status);
    }
    if (filter.isActive !== undefined) {
      employees = employees.filter(e => e.isActive === filter.isActive);
    }
    
    return simulateAsync(employees);
  },

  findById: async (id) => {
    const employee = mockEmployees.find(e => e._id === id);
    return simulateAsync(employee);
  },

  findByEmployeeId: async (empId) => {
    const employee = mockEmployees.find(e => e.employeeId === empId);
    return simulateAsync(employee);
  },

  create: async (employeeData) => {
    const newEmployee = {
      _id: generateId(),
      ...employeeData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockEmployees.push(newEmployee);
    return simulateAsync(newEmployee);
  },

  updateById: async (id, updateData) => {
    const employeeIndex = mockEmployees.findIndex(e => e._id === id);
    if (employeeIndex !== -1) {
      mockEmployees[employeeIndex] = {
        ...mockEmployees[employeeIndex],
        ...updateData,
        updatedAt: new Date()
      };
      return simulateAsync(mockEmployees[employeeIndex]);
    }
    return simulateAsync(null);
  },

  deleteById: async (id) => {
    const employeeIndex = mockEmployees.findIndex(e => e._id === id);
    if (employeeIndex !== -1) {
      const deletedEmployee = mockEmployees.splice(employeeIndex, 1)[0];
      return simulateAsync(deletedEmployee);
    }
    return simulateAsync(null);
  }
};

const setMockMode = (useMock) => {
  isUsingMockData = useMock;
};

const isMockMode = () => isUsingMockData;

module.exports = {
  mockUserService,
  mockProjectService,
  mockEmployeeService,
  setMockMode,
  isMockMode
};