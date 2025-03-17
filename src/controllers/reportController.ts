import { NextFunction, Request, Response } from "express";
import dbConnect from "../utils/dbConnect";
import User from "../model/User";
import Report from "../model/Report";
import { Types } from "mongoose";

export const getReportsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phone } = req.query;
    if (!phone) {
      res
        .status(400)
        .json({ success: false, message: "Sign In to view Reports" });
      return;
    }

    await dbConnect();

    const profile = await User.findOne({
      phoneNumber: phone,
    });

    if (!profile) {
      res
        .status(400)
        .json({ success: false, message: "Complete your profile or Sign In" });
      return;
    }

    const reports = await Report.find({
      phoneNumber: phone,
    }).sort({
      createdAt: -1,
    });

    if (profile && !reports) {
      res
        .status(400)
        .json({ success: false, message: "Error Fetching Reports" });
      return;
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Reports Found successfully",
        data: reports,
      });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getReportByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ success: false, message: "Please send id" });
      return;
    }

    await dbConnect();

    const report = await Report.findById(new Types.ObjectId(id));
    if (!report) {
      res
        .status(400)
        .json({
          success: false,
          message: "Report not available or is deleted",
        });
      return;
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Report Found Successfully!",
        data: report,
      });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
