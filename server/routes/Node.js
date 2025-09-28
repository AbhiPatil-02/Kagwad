// server/routes/contact.js
import express from "express";
import Contact from "../models/Contact.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const contact = new Contact({ ...req.body, userId: req.user.id });
    await contact.save();
    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;
