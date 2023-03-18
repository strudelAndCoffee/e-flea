import express from 'express'
import { UserModel } from '../../db/models'
import { withAuth, signToken } from '../../utils/auth'

const router = express.Router()

// Create new user
router.post('/signup', async (req, res) => {
  const {
    username,
    email,
    password,
    first_name,
    last_name,
    dob,
    vendor_account,
  } = req.body

  const has_username = await UserModel.findOne({ username })
  const has_email = await UserModel.findOne({ email })
  if (has_username)
    return res.status(400).json({ error: 'That username is already taken.' })
  else if (has_email)
    return res.status(400).json({ error: 'That user account already exists.' })

  const new_user = new UserModel({
    username,
    email,
    password,
    first_name,
    last_name,
    dob,
    vendor_account,
  })

  try {
    const response = await new_user.save()

    const token = signToken(username, email, new_user._id)
    res
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      })
      .json({
        response,
        message: 'Sign up success!',
      })
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await UserModel.findOne({ email })
  if (!user)
    return res.status(400).json({ message: 'The user account does not exist.' })

  const pw_is_valid = await user.isCorrectPw(password)
  if (!pw_is_valid)
    return res.status(401).json({ message: 'User credentials are incorrect.' })

  const token = signToken(user.username, email, user._id)
  res
    .cookie('access_token', token, {
      // maxAge: cookie_max_age,
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    })
    .json({
      user,
      message: 'Log in success!',
    })
})

// Log out user
router.post('/logout', (req, res) => {
  res.clearCookie('access_token')
  res.status(204).end()
})

export default router
