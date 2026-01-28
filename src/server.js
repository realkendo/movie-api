import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDb } from "./config/db.js";

// importing routes
import moviesRoutes from "./routes/movieRoutes.js";

// db coonection
config();
connectDB();

const app = express(); //app instaciation
const PORT = 5001; // setting port

// API routes
app.use("/", moviesRoutes);

// starting app server
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`);
});
