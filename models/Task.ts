// models/Task.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

interface ITask extends Document {
    _id: number;
  title: string;
  completed: boolean;
  userMail: string;
}

const TaskSchema: Schema<ITask> = new mongoose.Schema({
    _id: {
        type: Number, 
        required: true,
    },
  title: {
    type: String,
    required: [true, 'Please provide a task title'],
    trim: true,
    maxlength: [100, 'Task title cannot be more than 100 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userMail: {
    type: String,
    required: [true, 'Please provide a user mail'],
    trim: true,
    maxlength: [100, 'Task title cannot be more than 100 characters'],
  }
});

const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);

export default Task;
export type { ITask };