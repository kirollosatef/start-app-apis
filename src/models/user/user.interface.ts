import { Document, Types } from "mongoose";

interface IUser extends Document {
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
  comparePassword: (password: string) => Promise<boolean>;
}

export default IUser;
