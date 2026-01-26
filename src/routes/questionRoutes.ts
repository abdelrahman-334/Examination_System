import { Router } from 'express';
import { QuestionController } from '../controllers/questionController';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

// Read (Available to all authenticated users)
router.get('/', QuestionController.getAll);
router.get('/:id', QuestionController.getById);

// Write (Instructors Only)
router.post('/', requireRole('Instructor'), QuestionController.create);
router.put('/:id', requireRole('Instructor'), QuestionController.update);
router.delete('/:id', requireRole('Instructor'), QuestionController.delete);

export default router;