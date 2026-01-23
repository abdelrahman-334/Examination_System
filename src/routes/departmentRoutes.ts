import { Router } from 'express';
import { DepartmentController } from '../controllers/departmentController';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken)
router.post('/', DepartmentController.create);

router.get('/', DepartmentController.getAll);
router.get('/:id', DepartmentController.getById);

router.put('/:id', DepartmentController.update);

router.delete('/:id', DepartmentController.delete);

export default router;