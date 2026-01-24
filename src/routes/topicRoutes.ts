import { Router } from 'express';
import { TopicController } from '../controllers/topicController';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/', TopicController.getAll);
router.get('/:id', TopicController.getById);
router.get('/course/:courseId', TopicController.getByCourse);

router.post('/', requireRole('Instructor'), TopicController.create);
router.put('/:id', requireRole('Instructor'), TopicController.update);
router.delete('/:id', requireRole('Instructor'), TopicController.delete);

export default router;