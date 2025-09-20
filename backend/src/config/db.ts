import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("Database connected");
  } catch (err) {
    console.log("Error connecting db, details: " + err);
  }
}
