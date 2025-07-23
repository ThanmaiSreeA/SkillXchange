import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  skillName: {
    type: String,
    required: true
  },
  description: String,
  category: String,
  type: {
    type: String,
    enum: ["teach", "learn"], // Whether the user wants to teach or learn this skill
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Skill", skillSchema);
