import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import apiRoutes from "./routes/apiRoutes.js";
import { startSelfPing } from "./utils/selfPing.js";

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "The Underreported API is running" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Port Configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  // Start Render free tier self-ping keeping the service active
  // RENDER_EXTERNAL_URL is automatically populated on Render deployments
  const selfUrl = process.env.RENDER_EXTERNAL_URL || process.env.SELF_URL;
  if (selfUrl) {
    startSelfPing(selfUrl);
  } else {
    console.log("[Self-Ping] No RENDER_EXTERNAL_URL or SELF_URL in env. Self-ping is disabled.");
  }
});
