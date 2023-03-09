import { Request, Response, NextFunction } from 'express'

export default function withAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.cookies.access_token) res.redirect('/login')
  next()
}
