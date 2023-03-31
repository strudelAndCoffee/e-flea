import express from 'express'
import {
  createUser,
  readUser,
  readAllUsers,
  updateUser,
  deleteUser,
} from '../db/controllers/User'

const router = express.Router()

router.post('/create', createUser)
router.get('/', readAllUsers)
router.get('/:user_id', readUser)
router.put('/update/:user_id', updateUser)
router.delete('/delete/:user_id', deleteUser)

export default router
