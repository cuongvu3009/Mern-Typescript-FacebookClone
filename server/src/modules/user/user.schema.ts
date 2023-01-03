import { object, string, TypeOf } from 'zod'

export const userSchema = {
  body: object({
    id: string(),
    username: string()
      .min(3, 'username must be at least 3 characters')
      .max(64, 'password must not be longer than 64 charcters'),
    password: string()
      .min(6, 'Password must be at least 6 characters long')
      .max(64, 'Password should not be longer than 64 characters'),
    profilePicture: string(),
    coverPicture: string(),
    desc: string(),
    city: string(),
    from: string(),
    relationship: string(),
  }).partial(),
  params: object({
    id: string(),
    postId: string(),
  }).partial(),
}

export type userBody = TypeOf<typeof userSchema.body>
export type userParam = TypeOf<typeof userSchema.params>
