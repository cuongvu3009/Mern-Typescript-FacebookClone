import User from './user.model'
import { userBody } from './user.schema'

const updateUserInfo = async (id: string, update: userBody) => {
  return await User.findByIdAndUpdate(id, { $set: update }, { new: true })
}

const deleteOne = async (id: string) => {
  return await User.findByIdAndDelete(id)
}

const findOneById = async (id: string) => {
  return await User.findById(id)
}

const getAllUsers = async () => {
  return await User.find({})
}

const subscribeUser = async (id: string, userId: string) => {
  await User.findByIdAndUpdate(userId, {
    $addToSet: { followings: id },
  })
  await User.findByIdAndUpdate(id, {
    $addToSet: { followers: userId },
  })
}

const unsubscribeUser = async (id: string, userId: string) => {
  await User.findByIdAndUpdate(userId, {
    $pull: { followings: id },
  })
  await User.findByIdAndUpdate(id, {
    $pull: { followers: userId },
  })
}

export default {
  updateUserInfo,
  deleteOne,
  findOneById,
  getAllUsers,
  subscribeUser,
  unsubscribeUser,
}
