import { Router } from 'express';
import { AnswerController } from '../controllers/answerController';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

// Read (Authenticated Users)
router.get("/",AnswerController.getAll)
router.get('/:id', AnswerController.getById);
router.get('/question/:questionId', AnswerController.getByQuestion); // Get options for a question
// Write (Instructors Only)
router.post('/', requireRole('Instructor'), AnswerController.create);
router.put('/:id', requireRole('Instructor'), AnswerController.update);
router.delete('/:id', requireRole('Instructor'), AnswerController.delete);

export default router;