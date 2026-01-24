import { Router } from 'express';
import { StudentController } from '../controllers/studentController';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = Router();
router.use(authenticateToken); // Must be logged in

router.post('/', requireRole('Instructor'), StudentController.create);

router.get('/', StudentController.getAll);
router.get('/:userName', StudentController.getById);

// Only Instructors can manage Students
router.put('/:userName', requireRole('Instructor'), StudentController.update);
router.delete('/:userName', requireRole('Instructor'), StudentController.delete);

export default router;