import { Schema, Types, model } from "mongoose";
import IUser from "./user.interface";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS =
  (process.env.SALT_ROUNDS as unknown as number) || (10 as unknown as number);

const userSchema: Schema = new Schema(
  {
    id: Types.ObjectId,
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    data: { type: Types.ObjectId, ref: "data" },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = (await bcrypt.genSalt(10)) as unknown as string;
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err as Error);
  }
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<Error | boolean> {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (err) {
    throw err as Error;
  }
};

const User = model("users", userSchema);

export default User;
