import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Schema } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const secret = process.env.ACCESS_TOKEN_SECRET
const expiration = '2h'

// function withAuth(req: Request, res: Response, next: NextFunction) {
//   if (!req.cookies.access_token) return res.redirect('/login')
//   next()
// }

function signToken(username: string) {
  const payload = { username }
  return jwt.sign({ data: payload }, secret!, { expiresIn: expiration })
}

export { signToken }
