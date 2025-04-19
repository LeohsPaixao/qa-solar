import { Router } from 'express';
import { deleteUser } from '../controllers/deleteUser.js';
import { getAllUsers } from '../controllers/getAllUsers.js';
import { getEmailUser } from '../controllers/getEmailUser.js';
import { getUser } from '../controllers/getUser.js';
import { loginUser } from '../controllers/loginUser.js';
import { logoutUser } from '../controllers/logoutUser.js';
import { registerUser } from '../controllers/registerUser.js';
import { updateUser } from '../controllers/updateUser.js';
import { subscribe } from '../controllers/webhooks/subscribe.js';
import { unsubscribe } from '../controllers/webhooks/unsubscribe.js';
import { authenticate } from '../middleware/auth.js';
import { validateEmail } from '../middleware/validateEmail.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/user/email/:email', validateEmail, getEmailUser);
router.post('/logout', logoutUser);
router.get('/user/:email', validateEmail, getUser);
router.get('/users', getAllUsers);
router.put('/user/update', authenticate, updateUser);
router.delete('/user/delete', authenticate, deleteUser);
router.post('/webhooks/subscribe', subscribe);
router.delete('/webhooks/unsubscribe', unsubscribe);

export default router;
