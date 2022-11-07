import { ObjectId } from "mongoose"
import { ChatRoom } from "../schemas/ChatRoom"

const GetChatRoomByUsersService = (idUsers: ObjectId[]) => {
  const chatroom = ChatRoom.findOne({ idUsers: {
    $all: idUsers
  }})

  return chatroom
}

export default GetChatRoomByUsersService