import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../../../db/models'

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body
})

export default router
