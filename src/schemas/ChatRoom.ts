import mongoose, { Document, Schema } from "mongoose"
import type { User } from './User'
import { v4 as UuidV4 } from "uuid"

type ChatRoom = Document & {
  idUsers: User[]
  idChatRoom: string
}

const ChatRoomSchema = new Schema({
  idUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users"
    }
  ],
  idChatRoom: {
    type: String,
    default: UuidV4()
  }
})

const ChatRoom = mongoose.model<ChatRoom>("ChatRooms", ChatRoomSchema)

export { ChatRoom }