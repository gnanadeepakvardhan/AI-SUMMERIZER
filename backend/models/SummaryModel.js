import mongoose from "mongoose";

const SummarySchema = new mongoose.Schema({
  text: String,
  summary: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Summary", SummarySchema);
