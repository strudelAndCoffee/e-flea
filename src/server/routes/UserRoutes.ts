import express from 'express'
import {
  createUser,
  readUser,
  readAllUsers,
  updateUser,
  deleteUser,
} from '../db/controllers/User'
import userAuth from '../middleware/userAuth'
import { validateSchema, Schemas } from '../middleware/validateSchema'

const router = express.Router()

router.post('/create', validateSchema(Schemas.user.create), createUser)
router.get('/', readAllUsers)
router.get('/:user_id', userAuth, readUser)
router.put(
  '/update/:user_id',
  [userAuth, validateSchema(Schemas.user.update)],
  updateUser
)
router.delete('/delete/:user_id', userAuth, deleteUser)

export default router
