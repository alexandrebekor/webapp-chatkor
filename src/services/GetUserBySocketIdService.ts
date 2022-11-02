import { User } from "../schemas/User"

const GetUserBySocketIdService = async (socket_id: string) => {
  const user = await User.findOne({ socket_id }).exec()

  return user
}

export default GetUserBySocketIdService