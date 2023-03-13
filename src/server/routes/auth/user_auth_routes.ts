import express from 'express'
import bcrypt from 'bcrypt'
import { UserModel } from '../../db/models'
import { withAuth, signToken } from '../../utils/auth'

const router = express.Router()
const cookie_max_age = 900000

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body
  const user = await UserModel.findOne({ username })

  if (user) {
    return res.status(400).json({ error: 'The user account already exists.' })
  }

  try {
    const new_user = new UserModel({
      username,
      email,
      password,
    })
    await new_user.save()

    const token = signToken(username, email, new_user._id)
    res.cookie('access_token', token, {
      maxAge: cookie_max_age,
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    })
    res.json({
      new_user,
      message: 'Sign up success!',
    })
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await UserModel.findOne({ email })
  if (!user) {
    return res.status(400).json({ message: 'The user account does not exist.' })
  }

  const pw_is_valid = await user.isCorrectPw(password)
  if (!pw_is_valid) {
    return res.status(401).json({ message: 'User credentials are incorrect.' })
  }

  const token = signToken(user.username, email, user._id)
  res.cookie('access_token', token, {
    maxAge: cookie_max_age,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  })
  res.json({
    user,
    message: 'Log in success!',
  })
})

router.post('/logout', (req, res) => {
  res.clearCookie('access_token')
  res.status(204).end()
})

router.put('/:id', withAuth, async (req, res) => {
  const query = { _id: req.params.id }
  const update = { ...req.body.update_fields }
  try {
    const updated_user = await UserModel.findOneAndUpdate(query, update)
    if (!updated_user)
      res.status(400).json({ message: 'No user found with that ID.' })

    res.json({ updated_user })
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleted_user = await UserModel.findByIdAndDelete(req.params.id)
    if (!deleted_user)
      res.status(400).json({ message: 'No user found with that ID.' })

    res.json({ deleted_user_id: deleted_user?._id })
  } catch (err) {
    res.json(err)
  }
})

export default router
