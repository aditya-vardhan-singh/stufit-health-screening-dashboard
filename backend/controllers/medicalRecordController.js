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

export const getFilteredRecords = async (req, res) => {
  try {
    const { phase, startDate, endDate, schoolName, session, year } = req.query;
    let filter = {};

    // Phase filter
    if (phase) filter.phase = phase;

    // Date range filter
    if (startDate && endDate) {
      filter.dateOfVisit = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // School filter (via student reference)
    if (schoolName) {
      const students = await Student.find({ schoolName });
      const studentIds = students.map((s) => s._id);
      filter.student = { $in: studentIds };
    }

    // Fetch filtered records from DB
    const records = await MedicalRecord.find(filter).populate("student");

    const formatted = {};

    for (const rec of records) {
      const student = rec.student;
      const sid = student._id.toString();

      const month = rec.dateOfVisit.getMonth();
      const derivedSession = month < 6 ? "Jan - June" : "July - Dec";
      const derivedYear = rec.dateOfVisit.getFullYear();

      // Session filter (in-memory)
      if (session && session !== derivedSession) continue;

      // Year filter (in-memory)
      if (year && parseInt(year) !== derivedYear) continue;

      if (!formatted[sid]) {
        // Calculate age (if dob exists)
        let age = null;
        if (student.dob) {
          const dob = new Date(student.dob);
          const diff = new Date(rec.dateOfVisit) - dob;
          age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        }

        formatted[sid] = {
          id: student.rollNumber,
          name: student.name,
          school: student.schoolName,
          session: derivedSession,
          date: rec.dateOfVisit.toISOString().split("T")[0],
          year: derivedYear,
          age,
          defects: {},
        };
      }

      const diseaseKey = rec.diseaseType.toLowerCase();
      formatted[sid].defects[diseaseKey] = rec.remarks;
    }

    res.json(Object.values(formatted));
  } catch (error) {
    console.error("Error filtering records:", error);
    res.status(500).json({ message: error.message });
  }
};
