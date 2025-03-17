import express from "express";
import cors from "cors";
import predictRoutes from "./routes/predictRoutes";
import profileRoutes from "./routes/profileRoutes";
import reportRoutes from "./routes/reportRoutes";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use("/api/profile", profileRoutes);
app.use("/api/predict", predictRoutes);
app.use("/api/report", reportRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
