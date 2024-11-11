import express from "express";
import db from "../db/conn.mjs";


const authRouter = express.Router();

authRouter.post("/payment", async (req, res) => {
    try {
        const { userId, amount, currency, provider, accountInfo, swiftCode } = req.body;
        const newPayment = { userId, amount, currency, provider, accountInfo, swiftCode, status: "Pending" };
        console.log("hit", newPayment);
        const collection = await db.collection("payments");
        const result = await collection.insertOne(newPayment);
        res.status(201).send({ message: "Payment created successfully", paymentId: result.insertedId });
    } catch (error) {
        res.status(500).send({ message: "Error processing payment", error: error.message });
    }
});

export default authRouter;