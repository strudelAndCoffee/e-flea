import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Schema } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const secret = process.env.ACCESS_TOKEN_SECRET ?? '42'
const expiration = '2h'

function withAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies.access_token) return res.redirect('/login')
  next()
}

function signToken(user_id: string) {
  const payload = { user_id }
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
}

export { signToken, withAuth }
