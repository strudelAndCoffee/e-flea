import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../../../db/models'

const router = express.Router()
const hash_salt_rounds = 10

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body
  const user = await UserModel.findOne({ username })

  if (user) return res.json({ message: 'This user account already exists.' })

  const hashed_pw = await bcrypt.hash(password, hash_salt_rounds)
  const new_user = new UserModel({
    username,
    email,
    password: hashed_pw,
  })
  await new_user.save()

  res.json({ new_user, message: 'Sign up successful!' })
})

export default router
