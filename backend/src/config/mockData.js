const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};
const mockUsers = [
  {
    _id: 'user1',
    email: 'john@example.com',
    password: hashPassword('password123'),
    role: 'PM',
    __v: 0
  },
  {
    _id: 'user2',
    email: 'jane.smith@example.com',
    password: hashPassword('password123'),
    role: 'EMPLOYEE',
    __v: 0
  },
  {
    _id: 'user3',
    email: 'mike@example.com',
    password: hashPassword('password123'),
    role: 'PM',
    __v: 0
  },
  {
    _id: 'user4',
    email: 'alex.rodriguez@company.com',
    password: hashPassword('password123'),
    role: 'PM',
    __v: 0
  },
  {
    _id: 'user5',
    email: 'sarah.connor@example.com',
    password: hashPassword('password123'),
    role: 'EMPLOYEE',
    __v: 0
  },
  {
    _id: 'user6',
    email: 'david.kumar@company.com',
    password: hashPassword('password123'),
    role: 'EMPLOYEE',
    __v: 0
  },
  {
    _id: 'user7',
    email: 'emma.thompson@example.com',
    password: hashPassword('password123'),
    role: 'PM',
    __v: 0
  },
  {
    _id: 'user8',
    email: 'carlos.martinez@company.com',
    password: hashPassword('password123'),
    role: 'EMPLOYEE',
    __v: 0
  },
  {
    _id: 'user9',
    email: 'priya.patel@example.com',
    password: hashPassword('password123'),
    role: 'EMPLOYEE',
    __v: 0
  },
  {
    _id: 'user10',
    email: 'ryan.oconnor@company.com',
    password: hashPassword('password123'),
    role: 'EMPLOYEE',
    __v: 0
  }
];

const mockProjects = [
  {
    _id: 'project1',
    name: 'Smart Bench Frontend',
    requiredSkills: ['React', 'JavaScript', 'CSS', 'Redux'],
    budget: 50000,
    __v: 0
  },
  {
    _id: 'project2',
    name: 'API Development',
    requiredSkills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
    budget: 75000,
    __v: 0
  },
  {
    _id: 'project3',
    name: 'Database Design',
    requiredSkills: ['MongoDB', 'Database Design', 'Schema Modeling'],
    budget: 30000,
    __v: 0
  },
  {
    _id: 'project4',
    name: 'Mobile App Development',
    requiredSkills: ['React Native', 'Mobile UI', 'API Integration'],
    budget: 60000,
    __v: 0
  }
];

const mockEmployees = [
  {
    _id: 'emp1',
    name: 'John Doe',
    skills: ['React', 'Node.js', 'JavaScript', 'MongoDB'],
    hourlyRate: 85,
    status: 'Assigned',
    __v: 0
  },
  {
    _id: 'emp2',
    name: 'Jane Smith',
    skills: ['React', 'CSS', 'JavaScript', 'Redux', 'UI/UX'],
    hourlyRate: 75,
    status: 'Bench',
    __v: 0
  },
  {
    _id: 'emp3',
    name: 'Mike Johnson',
    skills: ['Express', 'MongoDB', 'REST APIs', 'Database Design'],
    hourlyRate: 90,
    status: 'Assigned',
    __v: 0
  },
  {
    _id: 'emp4',
    name: 'Sarah Wilson',
    skills: ['React Native', 'Mobile Development', 'API Integration'],
    hourlyRate: 80,
    status: 'Bench',
    __v: 0
  },
  {
    _id: 'emp5',
    name: 'David Chen',
    skills: ['Python', 'Django', 'PostgreSQL', 'Data Analysis'],
    hourlyRate: 95,
    status: 'Bench',
    __v: 0
  },
  {
    _id: 'emp6',
    name: 'Alex Rodriguez',
    skills: ['MongoDB', 'Database Design', 'Schema Modeling'],
    hourlyRate: 100,
    status: 'Bench',
    __v: 0
  },
  {
    _id: 'emp7',
    name: 'Sarah Connor',
    skills: ['PostgreSQL', 'SQL', 'Data Migration'],
    hourlyRate: 92,
    status: 'Bench',
    __v: 0
  },
  {
    _id: 'emp8',
    name: 'David Kumar',
    skills: ['MongoDB', 'Redis', 'Performance Tuning'],
    hourlyRate: 88,
    status: 'Assigned',
    __v: 0
  },
  {
    _id: 'emp9',
    name: 'Emma Thompson',
    skills: ['Node.js', 'Express', 'REST APIs', 'GraphQL'],
    hourlyRate: 95,
    status: 'Bench',
    __v: 0
  },
  {
    _id: 'emp10',
    name: 'Carlos Martinez',
    skills: ['Node.js', 'Express', 'Docker', 'Microservices'],
    hourlyRate: 98,
    status: 'Assigned',
    __v: 0
  },
  {
    _id: 'emp11',
    name: 'Priya Patel',
    skills: ['REST APIs', 'JWT', 'OAuth', 'Testing'],
    hourlyRate: 87,
    status: 'Bench',
    __v: 0
  },
  {
    _id: 'emp12',
    name: 'Ryan O\'Connor',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    hourlyRate: 82,
    status: 'Bench',
    __v: 0
  }
];

module.exports = {
  mockUsers,
  mockProjects,
  mockEmployees
};