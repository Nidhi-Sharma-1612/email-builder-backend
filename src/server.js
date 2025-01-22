import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";

// Load environment variables
dotenv.config();

// Define the port
const PORT = process.env.PORT || 5000;
connectDB();

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
