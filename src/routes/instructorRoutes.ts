import { Router } from 'express';
// Import your InstructorController here
import { InstructorController } from '../controllers/instructorController'; 
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = Router();
router.use(authenticateToken);

router.post('/', InstructorController.create);
router.get('/', InstructorController.getAll);
router.get('/:userName', InstructorController.getById);

// Assuming only Instructors can update other instructors (or Admin if you had one)
router.put('/:userName', requireRole('Instructor'), InstructorController.update);
router.delete('/:userName', requireRole('Instructor'), InstructorController.delete);

export default router;