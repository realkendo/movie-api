import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

// console.log("ENV CHECK:", process.env.DATABASE_URL);

// creating a neon databse instance
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

// const sql = neon(connectionString);
// const adapter = new PrismaNeon(sql);

const prisma = new PrismaClient({
  log:
    connectionString === "development" ? ["query", "error", "warn"] : ["error"],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected to Neon");
  } catch (error) {
    console.log(`❌ Database connection error: ${error.message}`);
    console.log(
      "Connection string used:",
      process.env.DATABASE_URL?.split("@")[1]?.split("/")[0],
    );
    process.exit(1);
  }
};

const disconnectDb = async () => {
  await prisma.$disconnect();
};

export { prisma, connectDB, disconnectDb };
