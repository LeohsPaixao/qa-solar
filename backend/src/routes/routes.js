import { Router } from 'express';
import { getUser } from '../controllers/getUser.js';
import { loginUser } from '../controllers/loginUser.js';
import { registerUser } from '../controllers/registerUser.js';
import { updateUser } from '../controllers/updateUser.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/user', updateUser);
router.get('/user', getUser);

export default router;
