import "dotenv/config";
import express from "express";
// import { config } from "dotenv";
import { connectDB, disconnectDb } from "./config/db.js";

// importing routes
import moviesRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// db connection
// config();
await connectDB();

const app = express(); //app instaciation
const PORT = 5001; // setting port

// body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/", moviesRoutes);
app.use("/auth", authRoutes);

// starting app server
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`);
  // console.log(process.env.DATABASE_URL);
});

// handle 'unhandled promise' rejections e.g database connection errors
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection: ", err);
  server.close(async () => {
    await disconnectDb();
    process.exit(1);
  });
});

// havdle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Unhandled Exception: ", err);
  await disconnectDb();
  process.exit(1);
});

//Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully...");
  server.close(async () => {
    await disconnectDb();
    process.exit(0);
  });
});
