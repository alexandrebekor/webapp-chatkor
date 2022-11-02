import { User } from "../schemas/User"

type CreateUser = {
  email: string
  socket_id: string
  avatar: string
  name: string
}

const CreateUserService = async ({email, socket_id, avatar, name}: CreateUser) => {
  const userAlreadyExists = await User.findOne({ email }).exec()

  if(userAlreadyExists) {
    const user = await User.findOneAndUpdate({
      _id: userAlreadyExists._id
    }, {
      $set: { socket_id, avatar, name }
    }, {
      new: true
    })

    return user
  }

  const user = await User.create({
    email,
    socket_id,
    avatar,
    name
  })

  return user
}

export default CreateUserService