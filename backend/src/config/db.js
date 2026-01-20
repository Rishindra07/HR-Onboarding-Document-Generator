import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error(`⚠️ MongoDB Connection Error: ${err.message}`);
    console.log("🔄 App will still run, but database features may not work");
    // Don't exit - let the app run anyway
    return null;
  }
};
