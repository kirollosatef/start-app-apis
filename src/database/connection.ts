import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL as string;

export const connect = async (): Promise<void> => {
  await mongoose.connect(MONGO_URL).then(() => {
    console.log("Connected to database");
  }).catch((err) => {
    console.log(err);
  });
};
