import { ChatRoom } from "../schemas/ChatRoom"

const CreateChatRoomService = async (idUsers: string[]) => {
  const room = await ChatRoom.create({ idUsers })
  
  return room
}

export default CreateChatRoomService