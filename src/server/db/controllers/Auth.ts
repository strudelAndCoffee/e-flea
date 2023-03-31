import { NextFunction, Request, Response } from 'express'
import { UserModel } from '../models'

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  const user = await UserModel.findOne({ email })
  if (!user) return res.status(401).json({ message: 'Invalid credentials.' })

  const pw_is_valid = await user.isCorrectPw(password)
  if (!pw_is_valid)
    return res.status(401).json({ message: 'Invalid credentials.' })

  return res.status(200).json({ user })
}

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  // res.clearCookie('access_token')
  return res.status(204).end()
}

export { loginUser, logoutUser }
