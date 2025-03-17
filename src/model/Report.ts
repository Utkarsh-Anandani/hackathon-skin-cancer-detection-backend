import mongoose from "mongoose";

interface IReport extends mongoose.Document {
  fullName: string;
  phoneNumber: string;
  age: number;
  gender: "M" | "F" | "O";
  type: "SC" | "P";
  image: string;
  part: string;
  description: string;
  result: string;
  accuracy: string;
}

const ReportSchema = new mongoose.Schema<IReport>(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    age: { type: Number, required: true },
    gender: {
      type: String,
      enum: ["M", "F", "O"],
      required: true,
    },
    type: {
      type: String,
      enum: ["SC", "P"],
      required: true,
    },
    image: { type: String, required: true },
    part: { type: String, required: true },
    description: { type: String, required: true },
    result: { type: String, required: true },
    accuracy: { type: String, required: true },
  },
  { timestamps: true }
);

const Report: mongoose.Model<IReport> =
  mongoose.models.Report || mongoose.model<IReport>("Report", ReportSchema);
export default Report;
export type { IReport };
