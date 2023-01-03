import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '../../helpers/apiError'
import User from './user.model'
import UserService from './user.service'

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { username, password, profilePicture, coverPicture } = req.body

    return res.json(
      await UserService.updateUserInfo(id, {
        username,
        password,
        profilePicture,
        coverPicture,
      })
    )
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    return res.json(await UserService.deleteOne(id))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const subscribeUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    await UserService.subscribeUser(id, userId)

    return res.json('Subscribed')
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const unsubscribeUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    await UserService.unsubscribeUser(id, userId)

    return res.json('Unsubscribed')
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const likePost = async (req: any, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
const dislikePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    return res.json(await UserService.findOneById(id))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const getFollowers = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.findOneById(req.user.id)
    return res.json(await user?.followers)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const getFollowings = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.findOneById(req.user.id)
    return res.json(await user?.followings)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json(await UserService.getAllUsers())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export {
  updateUser,
  deleteUser,
  getUser,
  subscribeUser,
  unsubscribeUser,
  likePost,
  dislikePost,
  getAllUsers,
  getFollowers,
  getFollowings,
}
