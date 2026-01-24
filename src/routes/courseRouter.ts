import { Router } from 'express';
import { CourseController } from '../controllers/courseController';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/', CourseController.getAll);
router.get('/:id', CourseController.getById);

// Create/Update/Delete (Only Instructors allowed)
// Note: If you have an 'Admin' role, add it here too.
router.post('/', requireRole('Instructor'), CourseController.create);
router.put('/:id', requireRole('Instructor'), CourseController.update);
router.delete('/:id', requireRole('Instructor'), CourseController.delete);

export default router;