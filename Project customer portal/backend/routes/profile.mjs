import express from "express";
import db from "../db/conn.mjs";


const authRouter = express.Router();

// Get profile
authRouter.get("/profile", async (req, res) => {
    try {
        const userId = req.userId;  // Assuming you have middleware to decode userId from token
        const collection = await db.collection("users");
        
        const user = await collection.findOne({ _id: new ObjectId(userId) });
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error retrieving profile", error: error.message });
    }
});

// Update profile
authRouter.put("/profile", async (req, res) => {
    try {
        const userId = req.userId;
        const updatedData = req.body;

        const collection = await db.collection("users");
        const result = await collection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: updatedData }
        );

        if (result.modifiedCount === 1) {
            res.status(200).send({ message: "Profile updated successfully" });
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating profile", error: error.message });
    }
});

export default authRouter;