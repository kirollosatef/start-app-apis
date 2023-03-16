import { Schema, Types, model } from "mongoose";

const dataSchema: Schema = new Schema({
  id: Types.ObjectId,
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

  user: { type: Types.ObjectId, ref: "users" },
});

const Data = model("data", dataSchema);

export default Data;
