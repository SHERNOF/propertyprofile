import mongoose from "mongoose";

let connected = false;
const connectDb = async () => {
  mongoose.set("strictQuery", true);
  // if the db is already connected, then don't connect again
  if (connected) {
    console.log("MongoDb already connected");
    return;
  }
  //   connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
