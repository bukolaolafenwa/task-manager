import mongoose, { Document, Schema } from "mongoose";

export enum TaskTag {
  IMPORTANT = "Important",
  PERSONAL = "Personal",
  URGENT = "Urgent",
  WORK = "Work",
}

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  tags: TaskTag[];
  completed: boolean;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },

   tags: {
      type: [String],
      enum: Object.values(TaskTag),
      required: [true, "At least one tag is required"],
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITask>("Task", taskSchema);