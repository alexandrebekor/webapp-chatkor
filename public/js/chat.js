const socket = io("http://localhost:3333")

socket.on("chat_started", (data) => {
  console.log(data)
})