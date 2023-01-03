import { object, string, TypeOf } from 'zod'

export const loginSchema = {
  body: object({
    username: string({
      required_error: 'username is required',
    })
      .min(3, 'username must be at least 3 characters')
      .max(64, 'password must not be longer than 64 charcters'),
    password: string({
      required_error: 'password is required',
    })
      .min(6, 'password must be at least 6 characters')
      .max(64, 'password must not be longer than 64 charcters'),
  }),
}

export const registerSchema = {
  body: object({
    username: string({
      required_error: 'username is required',
    })
      .min(3, 'username must be at least 3 characters')
      .max(64, 'password must not be longer than 64 charcters'),
    email: string({
      required_error: 'email is required',
    }).email('must be a valid email'),
    password: string({
      required_error: 'password is required',
    })
      .min(6, 'Password must be at least 6 characters long')
      .max(64, 'Password should not be longer than 64 characters'),
  }).required(),
}

export type LoginBody = TypeOf<typeof loginSchema.body>
export type registerBody = TypeOf<typeof registerSchema.body>
