import { io } from "../http"
import CreateChatRoomService from "../services/CreateChatRoomService"
import CreateUserService from "../services/CreateUserService"
import GetAllUsersService from "../services/GetAllUsersService"
import GetUserBySocketIdService from "../services/GetUserBySocketIdService"

io.on("connect", (socket) => {
  socket.on("start", async data => {
    const { email, avatar, name } = data

    const user = await CreateUserService({
      email,
      avatar,
      name,
      socket_id: socket.id
    })

    socket.broadcast.emit("new_users", user)
  })

  socket.on("get_users", async (callback) => {
    const users = await GetAllUsersService()
    callback(users)
  })

  socket.on("start_chat", async (data, callback) => {
    const userLogged = await GetUserBySocketIdService(socket.id)
    const room = await CreateChatRoomService([data.userId, userLogged._id])

    callback(room)
  })
})