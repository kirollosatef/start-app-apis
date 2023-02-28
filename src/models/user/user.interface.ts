import { Document, Types } from "mongoose";

interface IUser extends Document {
  id: Types.ObjectId;
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  comparePassword: (password: string) => Promise<boolean>;
}

export default IUser;
