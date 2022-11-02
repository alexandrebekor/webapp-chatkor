import { User, UserProps } from "../schemas/User"

type GetUser = {
  email: string
  socket_id: string
  avatar: string
  name: string
}

const GetAllUsersService = async () => {
 const users: GetUser[] =  await User.find()

 return users
}

export default GetAllUsersService