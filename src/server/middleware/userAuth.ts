import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const secret = process.env.ACCESS_TOKEN_SECRET

export default async function userAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header('x-auth-token')

  if (!token) return res.status(401).json({ message: 'Access denied.' })

  try {
    let user = await jwt.verify(token, secret!)
    next()
  } catch (error) {
    console.error(error)
    return res.status(400).json({ message: 'Invalid access token.' })
  }
}
