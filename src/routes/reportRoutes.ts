import { Router } from "express";
import {
  getReportByIdController,
  getReportsController,
} from "../controllers/reportController";

const router = Router();

router.get("/", getReportsController);
router.get("/:id", getReportByIdController);

export default router;
