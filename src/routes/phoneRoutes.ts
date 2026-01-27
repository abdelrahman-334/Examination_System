import { Router } from 'express';
import { PhoneController } from '../controllers/phoneController';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// All routes require login (Student OR Instructor)
router.use(authenticateToken);

// 1. Get My Phones
router.get('/', PhoneController.getMyPhones);

// 2. Add Phone
router.post('/', PhoneController.addPhone);

// 3. Update Phone (Body: { oldPhoneNumber, newPhoneNumber })
router.put('/', PhoneController.updatePhone);

// 4. Delete Phone (Pass number in URL)
router.delete('/:phoneNumber', PhoneController.deletePhone);

export default router;