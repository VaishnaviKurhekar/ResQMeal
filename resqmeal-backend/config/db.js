import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    if (process.env.NODE_ENV !== "production") {
      console.log(" MongoDB Connected");
    }
  } catch (error) {
    console.error(" MongoDB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;