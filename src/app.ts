import express from 'express';
import predictRoutes from './routes/predictRoutes';
import profileRoutes from './routes/profileRoutes';
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api/profile', profileRoutes)
app.use('/api/predict', predictRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
