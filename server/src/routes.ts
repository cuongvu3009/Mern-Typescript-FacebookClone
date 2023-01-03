import express from 'express'
const router = express.Router()

import { signup, login } from './modules/auth/auth.controller'
import {
  processRequestBody,
  processRequestParams,
} from 'zod-express-middleware'
import { userSchema } from './modules/user/user.schema'

import { loginSchema, registerSchema } from './modules/auth/auth.schema'
import {
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
} from './modules/user/user.controller'
import { verifyUser, verifyAccount } from './middlewares/verifyToken'

//	auth routes
router.post('/auth/register', processRequestBody(registerSchema.body), signup)
router.post('/auth/login', processRequestBody(loginSchema.body), login)

//	users routes
router.get('/users/find/:id', processRequestParams(userSchema.params), getUser)
router.get('/users/', getAllUsers)
router.patch(
  '/users/:id',
  processRequestBody(userSchema.body),
  processRequestParams(userSchema.params),
  verifyUser,
  updateUser
)
router.patch(
  '/users/sub/:id',
  processRequestParams(userSchema.params),
  verifyAccount,
  subscribeUser
)
router.patch(
  '/users/unsub/:id',
  processRequestParams(userSchema.params),
  verifyAccount,
  unsubscribeUser
)
router.patch(
  '/users/like/:postId',
  processRequestParams(userSchema.params),
  verifyAccount,
  likePost
)
router.patch(
  '/users/dislike/:postId',
  processRequestParams(userSchema.params),
  verifyAccount,
  dislikePost
)
router.delete(
  '/users/:id',
  processRequestParams(userSchema.params),
  verifyUser,
  deleteUser
)
router.get('/users/followers', verifyAccount, getFollowers)
router.get('/users/followings', verifyAccount, getFollowings)

export default router
