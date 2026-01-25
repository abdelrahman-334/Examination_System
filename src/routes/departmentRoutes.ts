import { Router } from 'express';
import { DepartmentController } from '../controllers/departmentController';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/',authenticateToken, DepartmentController.create);

router.get('/', DepartmentController.getAll);
router.get('/:id', DepartmentController.getById);

router.put('/:id', authenticateToken,DepartmentController.update);

router.delete('/:id', authenticateToken,DepartmentController.delete);

export default router;