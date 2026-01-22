import { Router } from 'express';
import { DepartmentController } from '../controllers/departmentController';

const router = Router();

router.post('/', DepartmentController.create);

router.get('/', DepartmentController.getAll);
router.get('/:id', DepartmentController.getById);

router.put('/:id', DepartmentController.update);

router.delete('/:id', DepartmentController.delete);

export default router;