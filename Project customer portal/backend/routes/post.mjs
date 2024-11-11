import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all the records.
router.get("/", async (req, res) => {
    try {
        let collection = await db.collection("posts");
        let results = await collection.find({}).toArray();
        res.status(200).send(results);  // Corrected the placement of the status code.
    } catch (error) {
        res.status(500).send({ message: "Error retrieving posts", error: error.message });
    }
});

// Create a new record.
router.post("/upload", async (req, res) => {
    try {
        let newDocument = {
            user: req.body.user,
            content: req.body.content,
            image: req.body.image,
        };
        
        let collection = await db.collection("posts");
        let result = await collection.insertOne(newDocument);

        // Send response after insertion
        res.status(201).send({ insertedId: result.insertedId });
    } catch (error) {
        console.error("Error inserting document:", error);
        res.status(500).send("Error inserting post");
    }
});

// Delete a post by ID
router.delete("/:id", async (req, res) => {
    const postId = req.params.id;
    
    try {
      let collection = await db.collection("posts");
      const result = await collection.deleteOne({ _id: new ObjectId(postId) });
  
      if (result.deletedCount === 0) {
        return res.status(404).send({ message: "Post not found" });
      }
  
      res.status(200).send({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).send({ message: "Error deleting post", error: error.message });
    }
  });  


export default router;
