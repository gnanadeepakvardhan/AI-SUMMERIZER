import express from "express";
import {
  summarizeText,
  getHistory,
  deleteSummary,
} from "../utils/summarizer.js";

const router = express.Router();

router.post("/", summarizeText);
router.get("/", getHistory);
router.delete("/:id", deleteSummary);

export default router;
