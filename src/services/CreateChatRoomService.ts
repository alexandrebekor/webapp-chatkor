import { ChatRoom } from "../schemas/ChatRoom"
import { v4 as UuidV4 } from 'uuid'

const CreateChatRoomService = async (idUsers: string[]) => {
  const room = await ChatRoom.create({ idUsers })
  
  return room
}

export default CreateChatRoomService