import { Document, Types } from "mongoose";

interface IData extends Document {
  toDoList: [
    {
      name: {type: String};
      description: {type: String};
    }
  ];
  notes: [
    {
      title: {type: String};
      content: {type: String};
    }
  ];
  happitTracker: [
    {
      name: {type: String};
      days: {type: Number};
      hours: {type: Number};
    }
  ];
}

export default IData;
