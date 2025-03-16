import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  countryCode: string;
  phoneNumber: string;
  fullName: string;
  country: string;
  city: string;
  dob: Date;
  gender: "M" | "F" | "O";
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    countryCode: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    gender: {
      type: String,
      enum: ["M", "F", "O"],
      required: true,
    },
    country: { type: String, required: true },
    city: { type: String, required: true },
    dob: { type: Date, required: true },
  },
  { timestamps: true }
);

const User: mongoose.Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
export type { IUser };
