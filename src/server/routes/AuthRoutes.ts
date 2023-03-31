import express from 'express'
import { loginUser, logoutUser } from '../db/controllers/Auth'

const router = express.Router()

router.post('/login', loginUser)
router.get('/logout', logoutUser)

export default router
