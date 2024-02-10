import mongoose from "mongoose";

const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Database Connected");
  }
  catch(e)
  {
    console.log("Error Connecting to Database")
  }
}

export default connectDB;