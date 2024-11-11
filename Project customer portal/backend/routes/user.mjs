import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ExpressBrute from "express-brute";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);

const JWT_SECRET = process.env.JWT_SECRET || "default_long_secret"; 

// Regex patterns for validation
const namePattern = /^[a-zA-Z0-9]+$/;
const idNumberPattern = /^[0-9]{13}$/;        // Adjust as per your ID format
const accountNumberPattern = /^[0-9]{10,12}$/; // Adjust as per account number format

// Helper function for logging errors
const logError = (location, error) => {
    console.error(`Error in ${location}:`, error.message || error);
};

// Route for user signup
router.post("/signup", async (req, res) => {
    try {
        const { name, idNumber, accountNumber, password } = req.body;

        // Input validation
        if (!namePattern.test(name)) {
            return res.status(400).json({ message: "Invalid characters in username." });
        }
        if (!idNumberPattern.test(idNumber)) {
            return res.status(400).json({ message: "Invalid ID Number format." });
        }
        if (!accountNumberPattern.test(accountNumber)) {
            return res.status(400).json({ message: "Invalid Account Number format." });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12); 
        const newUser = { name, idNumber, accountNumber, password: hashedPassword };

        // Save to the database
        const collection = await db.collection("users");
        const result = await collection.insertOne(newUser);
        
        res.status(201).json({ message: "User created successfully", userId: result.insertedId });
    } catch (error) {
        logError("/signup route", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route for user login with brute-force protection
router.post("/login", bruteforce.prevent, async (req, res) => {
    const { name, password } = req.body;

    try {
        // Validate name input
        if (!namePattern.test(name)) {
            return res.status(400).json({ message: "Invalid characters in username." });
        }

        const collection = await db.collection("users");
        const user = await collection.findOne({ name });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: "Authentication failed." });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Authentication failed." });
        }

        // Generate JWT token
        const token = jwt.sign({ name, id: user._id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Authentication successful", token, name });
    } catch (error) {
        logError("/login route", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
