const DatabaseService = require('./databaseService');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginService = async (email, password) => {
    const user = await DatabaseService.findUserByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return token;
};

exports.registerService = async (email, password, role) => {
    const existing = await DatabaseService.findUserByEmail(email);
    if (existing) throw new Error("User already exists");

    const hashed = await bcrypt.hash(password, 10);

    const user = await DatabaseService.createUser({
        email,
        password: hashed,
        role
    });

    return user;
};