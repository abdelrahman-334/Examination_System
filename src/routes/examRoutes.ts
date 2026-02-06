import { Router } from 'express';
import { ExamController } from '../controllers/examController';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

// Read (Instructors can see exams, Students might need a separate flow usually)
router.get('/', ExamController.getAll);
router.get('/:examNo', ExamController.getById); // Get Exam Info
router.get('/:examNo/questions', ExamController.getQuestions); // See the paper
router.get('/:examNo/take', ExamController.getExamPaper); 
router.get('/student/available', ExamController.getStudentExams);
// Write (Instructors Only)
router.post('/', requireRole('Instructor'), ExamController.create);
router.get('/:examNo/key', requireRole('Instructor'), ExamController.getExamKey);
router.post('/generate', requireRole('Instructor'), ExamController.generate);
router.delete('/:examNo', requireRole('Instructor'), ExamController.delete);

// clear exam questions
router.delete('/:examNo/questions', requireRole('Instructor'), ExamController.removeAllQuestions);

// Manual Question Management (Editing the Exam Paper)
router.post('/:examNo/questions', requireRole('Instructor'), ExamController.addQuestion);
router.delete('/:examNo/questions/:questionId', requireRole('Instructor'), ExamController.removeQuestion);

export default router;