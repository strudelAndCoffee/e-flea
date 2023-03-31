import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import UserModel from '../models/User'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body

  const username_taken = await UserModel.findOne({ username })
  const email_taken = await UserModel.findOne({ email })

  if (username_taken != null || email_taken != null)
    return res
      .status(400)
      .json({ message: 'The username or email provided are already in use.' })

  const user = await new UserModel({
    _id: new Types.ObjectId(),
    username,
    email,
    password,
  })

  try {
    const result = await user.save()
    return res.status(201).json({ user })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}

const readUser = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = req.params.user_id

  try {
    const user = await UserModel.findById(user_id).populate('orders')
    return user
      ? res.status(200).json({ user })
      : res.status(404).json({ message: 'User not found.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}

const readAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.find().populate('orders')
    return users
      ? res.status(200).json({ users })
      : res.status(404).json({ message: 'No users found.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = req.params.user_id

  const user = await UserModel.findById(user_id)
  if (!user) return res.status(404).json({ message: 'User not found.' })

  try {
    await user.set(req.body)
    user.save()
    return res.status(201).json({ user })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = req.params.user_id

  try {
    const deleted_user = await UserModel.findByIdAndDelete(user_id)

    return deleted_user
      ? res.status(200).json({ message: 'User deleted.' })
      : res.status(404).json({ message: 'No users found.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}

export { createUser, readUser, readAllUsers, updateUser, deleteUser }
