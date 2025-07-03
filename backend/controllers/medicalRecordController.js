import Student from "../models/Student.js";
import MedicalRecord from "../models/MedicalRecord.js";
import { getPhase } from "../utils/phaseUtils.js";

// 📝 Create new medical record using roll number
export const createMedicalRecord = async (req, res) => {
  try {
    const { rollNumber, dateOfVisit, diseaseType, remarks } = req.body;

    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const phase = getPhase(dateOfVisit);

    const record = await MedicalRecord.create({
      student: student._id,
      dateOfVisit,
      diseaseType,
      remarks,
      phase,
    });

    res
      .status(201)
      .json({ message: "Medical record created successfully", record });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📊 Filter records by phase, date, or school
export const getFilteredRecords = async (req, res) => {
  try {
    const { phase, startDate, endDate, schoolName } = req.query;

    let filter = {};

    if (phase) filter.phase = phase;

    if (startDate && endDate) {
      filter.dateOfVisit = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (schoolName) {
      const students = await Student.find({ schoolName });
      const studentIds = students.map((s) => s._id);
      filter.student = { $in: studentIds };
    }

    const records = await MedicalRecord.find(filter).populate("student");
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
