const mongoose = require("mongoose");
const { setMockMode } = require("../services/mockService");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000, // 30 seconds
        });
        console.log("✅ MongoDB Connected Successfully");
        setMockMode(false); 
        return true;
    }
    catch(err){
        console.warn("⚠️  MongoDB connection failed:", err.message);
        console.log("🔄 Switching to Mock Data Mode for development");
        setMockMode(true); // Switch to mock mode
        return false; // Indicate failure but don't exit
    }
}

module.exports = connectDB;