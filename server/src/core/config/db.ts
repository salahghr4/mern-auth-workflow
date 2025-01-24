import mongoose from "mongoose";
import env from "../constants/env";

const connectToDb = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("Successfully connected to DB");
  } catch (error) {
    console.log("Could not connect to DB", error);
    process.exit(1);
  }
};

export default connectToDb;
