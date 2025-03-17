import { Router } from "express";
import { predictSkinCancer } from "../controllers/predictController";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

router.post("/skin", upload.single("file"), predictSkinCancer);

export default router;
