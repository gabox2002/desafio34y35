import { Schema, model } from "mongoose";


const TaskSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        unique: true,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true
    },
    deletedAt: {
        type: Date,
        required: false
    }
})

export const Task = model("Task", TaskSchema)