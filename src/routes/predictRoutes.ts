import { Router } from 'express';
import { predictSkinCancer } from '../controllers/predictController';

const router = Router();

router.post('/', predictSkinCancer);

export default router;
