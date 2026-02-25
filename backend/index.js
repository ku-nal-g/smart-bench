const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const { isMockMode } = require("./src/services/mockService");

const authRoutes = require("./src/routes/auth.routes");
const projectRoutes = require("./src/routes/project.routes");
const employeeRoutes = require("./src/routes/employee.routes");
const aiRoutes = require("./src/routes/ai.routes");

dotenv.config();

const app = express();

// Initialize database connection (with fallback)
const initializeApp = async () => {
  const dbConnected = await connectDB();

  if (isMockMode()) {
    console.warn("Running in Mock Mode. Data will not persist across restarts.");
  }

  return dbConnected;
};


app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    await initializeApp();
    app.use("/api/auth", authRoutes);
    app.use("/api/projects", projectRoutes);
    app.use("/api/employees", employeeRoutes);
    app.use("/api/ai", aiRoutes);

    
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });

  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
};

startServer();