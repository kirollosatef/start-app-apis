import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// const MONGO_URL = process.env.MONGO_URL as string;
const MONGO_URL = "mongodb://localhost:27017/startAppApi";

mongoose.set("strictQuery", true);

export const connect = async () => {
  return await mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("Connected to database !!");
    })
    .catch((err) => {
      console.log(err);
    });
};
