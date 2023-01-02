import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  username: string
  email: string
  password: string
  profilePicture?: string
  coverPicture?: string
  followers?: string[]
  followings?: string[]
  isAdmin?: boolean
  desc?: string
  city?: string
  from?: string
  relationship?: string
  posts?: string[]
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    coverPicture: {
      type: String,
      default: '',
    },
    followers: {
      type: [String],
    },
    followings: {
      type: [String],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: String,
      enum: ['single', 'relationship', 'complicated'],
      default: 'single',
    },
    posts: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
)

const User = mongoose.model<UserDocument>('User', UserSchema)
export default User
