import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL) // ← missing await
    console.log("✅ Database connected")
  } catch (error) {
    console.error("❌ DB connection failed:", error)
    throw error
  }
};

export default connectDb;