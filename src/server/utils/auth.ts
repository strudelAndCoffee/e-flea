import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { Schema } from 'mongoose'

const secret = process.env.ACCESS_TOKEN_SECRET ?? '42'
const expiration = '2h'

function withAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies.access_token)
    res.status(401).json({ message: 'You are not authorized. Please log in.' })
  next()
}

function signToken(
  username: string,
  email: string,
  _id: Schema.Types.ObjectId | string
) {
  const payload = { username, email, _id }
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
}

export { signToken, withAuth }
