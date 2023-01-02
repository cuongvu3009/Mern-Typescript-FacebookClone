import { Request, Response, NextFunction } from 'express'
import UserService from './auth.service'
import { BadRequestError } from '../../helpers/apiError'
import User from '../user/user.model'
import { registerBody, LoginBody } from './auth.schema'

const signup = async (
  req: Request<object, object, registerBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body

    const user = new User({ username, email, password })

    const result = await UserService.createUser(user)

    const oneDay = 1000 * 60 * 60 * 24

    res
      .cookie('access_token', result?.token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        // signed: true,
      })
      .status(201)
      .json({ result })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const login = async (
  req: Request<object, object, LoginBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body

    const user = new User({
      username,
      password,
    })

    const result = await UserService.authenticate(user)

    const oneDay = 1000 * 60 * 60 * 24

    res
      .cookie('access_token', result?.token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        // signed: true,
      })
      .status(200)
      .json({ result })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export { signup, login }
