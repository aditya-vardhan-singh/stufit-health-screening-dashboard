// scripts/seedDummyData.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import Student from "../models/Student.js";
import MedicalRecord from "../models/MedicalRecord.js";

dotenv.config(); // load env vars (like MONGO_URI)

// Dummy students
const students = [
  {
    name: "Ravi Sharma",
    rollNumber: "101",
    admissionNumber: "A101",
    class: "7th",
    schoolName: "Sunrise Public School",
  },
  {
    name: "Neha Verma",
    rollNumber: "102",
    admissionNumber: "A102",
    class: "8th",
    schoolName: "Green Valley School",
  },
  {
    name: "Aman Khan",
    rollNumber: "103",
    admissionNumber: "A103",
    class: "6th",
    schoolName: "Sunrise Public School",
  },
];

// Dummy medical records (will link to students after inserting them)
const medicalRecords = (studentIds) => [
  {
    student: studentIds[0],
    dateOfVisit: new Date("2024-01-15"),
    phase: "Phase 1",
    diseaseType: "Eye",
    remarks: "Needs glasses",
  },
  {
    student: studentIds[1],
    dateOfVisit: new Date("2024-03-10"),
    phase: "Phase 1",
    diseaseType: "Dental",
    remarks: "Cavity found",
  },
  {
    student: studentIds[2],
    dateOfVisit: new Date("2024-05-20"),
    phase: "Phase 2",
    diseaseType: "Psychological",
    remarks: "Referred to counselor",
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected.");

    await Student.deleteMany({});
    await MedicalRecord.deleteMany({});
    console.log("🗑 Old data cleared.");

    const insertedStudents = await Student.insertMany(students);
    console.log(`👨‍🎓 Inserted ${insertedStudents.length} students.`);

    const studentIds = insertedStudents.map((s) => s._id);
    const recordsToInsert = medicalRecords(studentIds);

    await MedicalRecord.insertMany(recordsToInsert);
    console.log(`🩺 Inserted ${recordsToInsert.length} medical records.`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
