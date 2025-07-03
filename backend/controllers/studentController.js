import Student from "../models/Student.js";

// 🎓 Register student before visiting doctor
export const registerStudent = async (req, res) => {
  try {
    const {
      name,
      rollNumber,
      class: studentClass,
      admissionNumber,
      schoolName,
    } = req.body;

    // Check for existing student with same roll number
    const existing = await Student.findOne({ rollNumber });
    if (existing) {
      return res
        .status(409)
        .json({ message: "Roll number already registered" });
    }

    const student = await Student.create({
      name,
      rollNumber,
      class: studentClass,
      admissionNumber,
      schoolName,
    });

    res
      .status(201)
      .json({ message: "Student registered successfully", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
