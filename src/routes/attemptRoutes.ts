import { Router } from 'express';
import { AttemptController } from '../controllers/attemptController';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken); // Students must be logged in

// 1. Start Exam (Returns attemptId)
router.post('/start', AttemptController.startExam);

// 2. Submit/Change Answers
router.post('/answer', AttemptController.submitAnswer);
router.put('/answer', AttemptController.changeAnswer);

// 3. Finish & Grade
router.post('/finish', AttemptController.finishExam);

// 4. View History
router.get('/history', AttemptController.getHistory);


router.get('/:attemptId/review', AttemptController.getStudentExamAnswers);
export default router;