import { Router } from 'express';
import { getEmailUser } from '../controllers/getEmailUser.js';
import { getUser } from '../controllers/getUser.js';
import { loginUser } from '../controllers/loginUser.js';
import { logoutUser } from '../controllers/logoutUser.js';
import { registerUser } from '../controllers/registerUser.js';
import { updateUser } from '../controllers/updateUser.js';

const router = Router();

router.post('/register', registerUser);
router.get('/useremail', getEmailUser);
router.post('/login', loginUser);
router.put('/user', updateUser);
router.post('/user', getUser);
router.post('/logout', logoutUser);

export default router;
