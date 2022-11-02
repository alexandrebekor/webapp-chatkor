import { io } from "../http"
import CreateUserService from "../services/CreateUserService"
import GetAllUsersService from "../services/GetAllUsersService"

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
})