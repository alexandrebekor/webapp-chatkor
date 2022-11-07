import { ChatRoom } from "../schemas/ChatRoom"

const GetChatRoomByIdService = async (idChatRoom: string) => {
  const room = await ChatRoom.findOne({
    idChatRoom
  }).populate("idUsers")

  return room
}

export default GetChatRoomByIdService