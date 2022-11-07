import { Message } from "../schemas/Message"

const GetMessageByChatRoomService = async (roomId: string) => {
  const messages = await Message.find({ roomId }).populate("to")

  return messages
}

export default GetMessageByChatRoomService