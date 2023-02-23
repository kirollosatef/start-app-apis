import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: {String, required: true},
    phone: {String, required: true},
    email: {String, required: true, unique: true},
    password: {String, required: true},
    role: {type: String, enum: ["admin", "user"], default: "user"},
    toDoList: [{
        name: String,
        description: String,
        type: {type: String, enum: ["easy", "middle", "hard"]},
    }],
    notes: [{
        title: String,
        content: String,
    }],
    happitTracker: [{
        name: String,
        days: Number,
        hours: Number,
    }]
});

export const User = mongoose.model("User", userSchema);