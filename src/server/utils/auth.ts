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
  _id: Schema.Types.ObjectId | string
) {
  const payload = { username, email, _id }
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  let token: string | undefined | null =
    req.body.token || req.headers.authorization

  // if (req.headers.authorization) {
  //   token = token?.split(' ').pop().trim()
  // }
  // const data: string | jwt.JwtPayload = jwt.verify

  if (token) {
    jwt.verify(token, secret, (err) => {
      if (err) return res.sendStatus(403)
      next()
    })
  } else res.sendStatus(401)
}

export { signToken, authMiddleware, withAuth }
