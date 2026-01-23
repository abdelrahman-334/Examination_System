import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();


// Register Routes (from previous step)
router.post('/register/student', AuthController.registerStudent);
router.post('/register/instructor', AuthController.registerInstructor);

// Login Route (New)
router.post('/login', AuthController.login);

export default router;