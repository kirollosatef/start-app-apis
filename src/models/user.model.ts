import mongoose, { Document, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS =
  (process.env.SALT_ROUNDS as unknown as number) || (10 as unknown as number);

export interface IUser extends Document {
  id: Types.ObjectId;
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  toDoList: [
    {
      name: string;
      description: string;
      type: string;
    }
  ];
  notes: [
    {
      title: string;
      content: string;
    }
  ];
  happitTracker: [
    {
      name: string;
      days: number;
      hours: number;
    }
  ];
  commparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema = new Schema({
  id: Types.ObjectId,
  name: { String, required: true },
  phone: { String, required: true },
  email: { String, required: true, unique: true },
  password: { String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  toDoList: [
    {
      name: String,
      description: String,
      type: { type: String, enum: ["easy", "middle", "hard"] },
    },
  ],
  notes: [
    {
      title: String,
      content: String,
    },
  ],
  happitTracker: [
    {
      name: String,
      days: Number,
      hours: Number,
    },
  ],
});

userSchema.pre<IUser>("save", async function (next) {
  try {
    const salt = bcrypt.genSalt(SALT_ROUNDS) as unknown as string;
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err as Error);
  }
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (err) {
    throw err as Error;
  }
};

export const User = mongoose.model("User", userSchema);
