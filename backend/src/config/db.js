import mongoose from "mongoose";
import config from "./config.js";
import dotenv from "dotenv";

dotenv.config();

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoURI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectMongoDB;
