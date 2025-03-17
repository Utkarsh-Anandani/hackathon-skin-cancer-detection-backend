import { NextFunction, Request, Response } from "express";
import User from "../model/User";
import { uploadToS3 } from "../config/s3.config";
import Report, { IReport } from "../model/Report";
import axios from "axios";
import dbConnect from "../utils/dbConnect";

export const predictSkinCancer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { part, description, phoneNumber } = req.body;
    const phone = phoneNumber.substring(3);

    if (!req.file) {
      res.status(400).json({ success: false, message: "File not received!" });
      return;
    }

    await dbConnect();
    const user = await User.findOne({
      phoneNumber: phone,
    });

    if (!user) {
      res.status(400).json({ success: false, message: "User not Found" });
      return;
    }

    const s3Result = await uploadToS3(req.file);
    let today = new Date();

    const prediction = await axios.post(
      `${process.env.FLASK_BACKEND_URI}/predict`,
      {
        image: s3Result.Location,
      }
    );

    if (prediction) {
      const report: IReport = await Report.create({
        phoneNumber: user?.phoneNumber,
        fullName: user?.fullName,
        gender: user?.gender,
        type: "SC",
        age: today.getFullYear() - user?.dob?.getFullYear()!,
        image: s3Result.Location,
        part,
        description,
        result: prediction.data.predicted_class,
        accuracy: prediction.data.prediction_probability,
      });

      if (report) {
        res.json({
          success: true,
          message: "Report created successfully!",
          data: report,
        });
        return;
      } else {
        res.json({ success: true, message: "Report creation Failed!" });
        return;
      }
    }
    res.json({ success: true, message: "Report creation Failed!" });
  } catch (error: any) {
    console.error(error.message);
    next(error);
  }
};
