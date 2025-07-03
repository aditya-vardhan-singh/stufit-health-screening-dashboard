import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  dateOfVisit: { type: Date, required: true },
  phase: { type: String, enum: ['Phase 1', 'Phase 2'], required: true },
  diseaseType: { type: String, enum: ['Eye', 'Dental', 'Psychological'], required: true },
  remarks: String
}, { timestamps: true });

export default mongoose.model('MedicalRecord', medicalRecordSchema);
