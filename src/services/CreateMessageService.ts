import { Message } from "../schemas/Message"

type CreateMessage = {
  to: string
  text: string,
  roomId: string
}

const CreateMessageService = async ({ to, text, roomId}: CreateMessage) => {
  const message = await Message.create({
    to,
    text,
    roomId
  })

  return message
}

export default CreateMessageService