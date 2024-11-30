import { Router } from 'express';
import { deleteUser } from '../controllers/deleteUser.ts';
import { getAllUsers } from '../controllers/getAllUsers.ts';
import { getEmailUser } from '../controllers/getEmailUser.ts';
import { getUser } from '../controllers/getUser.ts';
import { loginUser } from '../controllers/loginUser.ts';
import { logoutUser } from '../controllers/logoutUser.ts';
import { registerUser } from '../controllers/registerUser.ts';
import { updateUser } from '../controllers/updateUser.ts';
import { authenticate } from '../middleware/auth.ts';
import { validateEmail } from '../middleware/validateEmail.ts';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/user', validateEmail, getUser);
router.post('/useremail', validateEmail, getEmailUser);
router.post('/logout', authenticate, logoutUser);
router.get('/users', getAllUsers);
router.put('/user/update', authenticate, updateUser);
router.delete('/user/delete', authenticate, deleteUser);

export default router;
