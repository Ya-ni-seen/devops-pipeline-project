import express from "express";
import db from "../db/conn.mjs";


const authRouter = express.Router();

authRouter.get("/transactions", async (req, res) => {
    try {
        const collection = await db.collection("payments");
        const results = await collection.find({ status: "Pending" }).toArray();
        res.status(200).send(results);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving transactions", error: error.message });
    }
});

// Verify a transaction
authRouter.put("/transactions/:id/verify", async (req, res) => {
    try {
        const transactionId = req.params.id;
        const collection = await db.collection("payments");
        
        const result = await collection.updateOne(
            { _id: new ObjectId(transactionId) },
            { $set: { status: "Verified" } }
        );

        if (result.modifiedCount === 1) {
            res.status(200).send({ message: "Transaction verified successfully" });
        } else {
            res.status(404).send({ message: "Transaction not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error verifying transaction", error: error.message });
    }
});

export default authRouter;