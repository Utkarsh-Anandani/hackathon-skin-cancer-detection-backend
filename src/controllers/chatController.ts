import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextFunction, Request, Response } from "express";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const getChatResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { message } = req.body;

  try {
    const result = await model.generateContent(
      message + "Give response in plain text format and 100 words only"
    );
    if (!result) {
      res
        .status(200)
        .json({
          success: true,
          message: "Got AI Response",
          data: "Replying to this topic is out of my knowledge, consult an expert instead.",
        });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Got AI Response",
        data: result.response.text(),
      });
  } catch (error: any) {
    console.error("Error:", error.message);
    next(error);
  }
};
