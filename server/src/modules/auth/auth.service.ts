import User from '../user/user.model'
import { UserDocument } from '../user/user.model'
import { BadRequestError, NotFoundError } from '../../helpers/apiError'
import {
  createToken,
  hashPassword,
  verifyPassword,
} from '../../util/authentication'

const createUser = async (user: UserDocument) => {
  const { username, email, password } = user
  const hashedPassword = await hashPassword(password)

  const userData = {
    username: username.toLowerCase(),
    email,
    password: hashedPassword,
  }

  const existingUsername = await User.findOne({
    username: userData.username,
  })

  const existingEmail = await User.findOne({
    email: userData.email,
  })

  if (existingUsername || existingEmail) {
    throw new BadRequestError('User already exists.')
  }

  const newUser = new User(userData)
  const savedUser = await newUser.save()

  if (savedUser) {
    const token = createToken(savedUser)

    return {
      message: 'User created!',
      token,
      userInfo: savedUser,
    }
  } else {
    throw new BadRequestError('There was a problem creating your account.')
  }
}

const authenticate = async (user: UserDocument) => {
  const { username, password } = user

  const userData = await User.findOne({
    username: username.toLowerCase(),
  })

  if (!userData) {
    throw new NotFoundError('Wrong username or password.')
  }

  const passwordValid = await verifyPassword(password, userData.password)

  if (passwordValid) {
    const token = createToken(userData)

    return {
      message: 'Authentication successful!',
      token,
      userInfo: userData,
    }
  } else {
    throw new BadRequestError('Something went wrong.')
  }
}

export default { authenticate, createUser }
