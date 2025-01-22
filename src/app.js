import express from "express";
import cors from "cors";
import emailRoutes from "./routes/emailRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static file serving for uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/emails", emailRoutes);

export default app;
