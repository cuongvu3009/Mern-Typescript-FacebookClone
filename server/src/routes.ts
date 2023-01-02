import express from 'express'
const router = express.Router()

import { signup, login } from './modules/auth/auth.controller'
import { processRequestBody } from 'zod-express-middleware'
import { loginSchema, registerSchema } from './modules/auth/auth.schema'

router.post('/auth/register', processRequestBody(registerSchema.body), signup)
router.post('/auth/login', processRequestBody(loginSchema.body), login)

export default router
