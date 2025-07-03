import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    admissionNumber: String,
    class: String,
    schoolName: String,
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
