import { server } from "./http"
import "./websocket/ChatService"

const PORT = 3333

server.listen(PORT, () => console.log(`Running on port ${PORT}`))