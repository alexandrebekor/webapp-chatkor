import { io } from "../http"
import CreateChatRoomService from "../services/CreateChatRoomService"
import CreateMessageService from "../services/CreateMessageService"
import CreateUserService from "../services/CreateUserService"
import GetAllUsersService from "../services/GetAllUsersService"
import GetChatRoomByIdService from "../services/GetChatRoomByIdService"
import GetChatRoomByUsersService from "../services/GetChatRoomByUsersService"
import GetMessageByChatRoomService from "../services/GetMessageByChatRoomService"
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

    let room = await GetChatRoomByUsersService([data.userId, userLogged._id])

    if(!room) {
      room = await CreateChatRoomService([data.userId, userLogged._id])
    }

    // open the channel communication
    socket.join(room.idChatRoom)

    const messages = await GetMessageByChatRoomService(room.idChatRoom)

    callback({room, messages})
  })

  socket.on("send_message", async (data) => {
    const user = await GetUserBySocketIdService(socket.id)

    const message = await CreateMessageService({
      to: user._id,
      text: data.message,
      roomId: data.roomId
    })

    // communication with all users in
    io.to(data.roomId).emit("message", {
      message,
      user
    })

    // send notification
    const room = await GetChatRoomByIdService(data.roomId)

    const userFrom = room.idUsers.find(response => String(response._id) !== String(user._id))

    io.to(userFrom.socket_id).emit("notification", {
      roomId: data.roomId,
      from: user
    })
  })
})