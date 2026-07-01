import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connecter to HOST ${mongoose.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    mongoose.connection.close();
    process.exit(1);
  }
};

export default connectDB;
