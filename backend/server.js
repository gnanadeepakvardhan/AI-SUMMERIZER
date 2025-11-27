import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import summarizerRoutes from "./routes/summarizerRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/summarize", summarizerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
