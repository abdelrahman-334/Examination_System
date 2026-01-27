import { Router } from 'express';
import { StudentController } from '../controllers/studentController';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = Router();
router.use(authenticateToken); // Must be logged in

router.post('/', requireRole('Instructor'), StudentController.create);



router.get('/', StudentController.getAll);
router.get('/:userName', StudentController.getById);

// Only Instructors can manage Students
router.get('/dept/:deptNo', requireRole('Instructor'), StudentController.getStudentsByDept);
router.put('/:userName', requireRole('Instructor'), StudentController.update);
router.delete('/:userName', requireRole('Instructor'), StudentController.delete);
router.get('/:userName/grades', StudentController.getGrades);

export default router;