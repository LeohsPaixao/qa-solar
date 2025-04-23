import { Router } from 'express';
import { deleteUser } from '../controllers/deleteUser.js';
import { getAllUsers } from '../controllers/getAllUsers.js';
import { getMeUser } from '../controllers/getMeUser.js';
import { loginUser } from '../controllers/loginUser.js';
import { logoutUser } from '../controllers/logoutUser.js';
import { registerUser } from '../controllers/registerUser.js';
import { sendEmail } from '../controllers/sendEmail.js';
import { updateUser } from '../controllers/updateUser.js';
import { subscribe } from '../controllers/webhooks/subscribe.js';
import { unsubscribe } from '../controllers/webhooks/unsubscribe.js';
import { authenticate } from '../middleware/auth.js';
import { validateEmail } from '../middleware/validateEmail.js';

const router = Router();

router.post('/users/register', registerUser);
router.post('/auth/login', loginUser);
router.post('/auth/logout', logoutUser);
router.post('/users/:email', validateEmail, sendEmail);
router.get('/users/me', authenticate, getMeUser);
router.get('/users', getAllUsers);
router.put('/users/update', authenticate, updateUser);
router.delete('/users/delete', authenticate, deleteUser);
router.post('/webhooks/subscribe', subscribe);
router.delete('/webhooks/unsubscribe', unsubscribe);

export default router;
