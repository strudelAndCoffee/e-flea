import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { Schema } from 'mongoose'

const secret = process.env.ACCESS_TOKEN_SECRET ?? '42'
const expiration = '2h'

function withAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies.access_token) res.redirect('/login')
  next()
}

function signToken(
  username: string,
  email: string,
  _id: Schema.Types.ObjectId
) {
  const payload = { username, email, _id }
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
}

function authMiddleware(req: Request) {
  // let token = req.body.token || req.query.token || req.headers.authorization
  // let token: string | undefined | null = req.headers.cookie || req.body.token

  // if (req.headers.authorization) {
  //   token = token.split(' ').pop().trim()
  // }

  // if (!token) return req

  // const data: string | jwt.JwtPayload = jwt.verify(token, secret, {
  //   maxAge: expiration,
  // })
  // console.log(token)
  // try {
  //   const data: string | jwt.JwtPayload = jwt.verify(token, secret, {
  //     maxAge: expiration,
  //   })
  //   req.body.user = data
  // } catch (err) {
  //   console.error(err)
  //   return req
  // }
  return req
}

export { signToken, authMiddleware, withAuth }
