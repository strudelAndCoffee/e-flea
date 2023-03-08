import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { UserModel } from '../../../db/models'

const router = express.Router()
const hash_salt_rounds = 10
const secret = crypto.randomUUID()

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

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  let user
  if (email) user = await UserModel.findOne({ email })
  if (!user) return res.json({ message: 'User does not exist.' })

  const pw_is_valid = await bcrypt.compare(password, user.password)
  if (!pw_is_valid)
    return res.json({ message: 'User credentials are incorrect.' })

  const token = jwt.sign({ id: user._id }, secret)
  res.json({ token, userID: user._id })
})

export default router
