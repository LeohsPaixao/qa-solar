import { Router } from 'express'
import { loginUser } from '../controllers/loginUser.js'
import { registerUser } from '../controllers/registerUser.js'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

export default router
