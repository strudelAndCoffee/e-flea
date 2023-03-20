import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Schema } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

type TokenType = {
  username: string
  email: string
  vendor_account: boolean
  id: string
}

export const secret = process.env.ACCESS_TOKEN_SECRET ?? '42'
const expiration = '2h'

function withAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies.access_token) return res.redirect('/login')
  next()
}

function withVendorAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.access_token
  if (!token) return res.redirect('/login')

  const response = jwt.verify(token, secret)
  // if (response.data!.vendor_account) {
  // }
  // next()
}

function signToken({ username, email, vendor_account, id }: TokenType) {
  const payload = { username, email, vendor_account, id }
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
}

export { signToken, withAuth, withVendorAuth }
