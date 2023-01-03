import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError, BadRequestError } from '../helpers/apiError'
import { JWT_SECRET } from '../util/secrets'
import jwt from 'jsonwebtoken'

const verifyAccount = (req: any, res: Response, next: NextFunction) => {
  const token = (
    req.headers.authorization ||
    req.cookies.access_token ||
    ''
  ).replace(/^Bearer\s/, '')

  if (!token) {
    return next(new UnauthorizedError())
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return next(new BadRequestError('Token is not valid'))
    req.user = user
    next()
  })
}

const verifyUser = async (req: any, res: Response, next: NextFunction) => {
  verifyAccount(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    } else {
      return next(new UnauthorizedError())
    }
  })
}

const verifyAdmin = async (req: any, res: Response, next: NextFunction) => {
  verifyAccount(req, res, () => {
    if (req.user.isAdmin) {
      next()
    } else {
      return next(new UnauthorizedError())
    }
  })
}

export { verifyAdmin, verifyUser, verifyAccount }
