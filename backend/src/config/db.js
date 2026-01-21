import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI)
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error(`⚠️ MongoDB Connection Error: ${err}`);
    console.log("🔄 App will still run, but database features may not work");
    // Don't exit - let the app run anyway
    return null;
  }
};
