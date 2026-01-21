import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    return conn;
  } catch (err) {
    // Connection error - app will continue running
    return null;
  }
};
