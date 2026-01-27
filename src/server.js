import express from "express";

// importing routes
import moviesRoutes from "./routes/movieRoutes.js";

const app = express(); //app instaciation
const PORT = 5001; // setting port

// API routes
app.use("/", moviesRoutes);

// starting app server
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`);
});
