import { Router } from 'express';
import { createProfileController, getProfileController } from '../controllers/profileController';

const router = Router();

router.post('/', createProfileController);
router.get('/', getProfileController);

export default router;