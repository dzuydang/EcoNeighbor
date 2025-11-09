import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import alertRoutes from "./routes/alertRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import dataRoutes from "./routes/dataRoutes.js";
import reportingRoutes from "./routes/reportingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import { query } from "./config/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(helmet()); // used for security to protect app by setting various HTTP headers
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); // manage cross-origin requests
app.use(morgan("dev")); //logs requests to console
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/alert", alertRoutes);
app.use("/comment", commentRoutes);
app.use("/data", dataRoutes);
app.use("/reporting", reportingRoutes);
app.use("/user", userRoutes);
app.use("/health", healthRoutes);

const fullfilename = fileURLToPath(import.meta.url);
const fulldirname = path.dirname(fullfilename);

async function initDB() {
  try {
    const sqlPath = path.join(fulldirname, "sql", "createTables.sql");
    const sql = fs.readFileSync(sqlPath, "utf-8");
    await query(sql);
  } catch (error) {
    console.log("Error in initializaing Database in index.js", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is Running on " + PORT);
  });
});
