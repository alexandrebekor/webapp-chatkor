const socket = io("http://localhost:3333")
let roomId = ""

const onLoad = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const name = urlParams.get("name")
  const email = urlParams.get("email")
  const avatar = urlParams.get("avatar")

  document.querySelector(".user_logged").innerHTML += `
    <img class="avatar_user_logged" src="${avatar}"/>
    <strong id="user_logged">${name}</strong>
  `

  socket.on("new_users", data => {
    const existsUserInDiv = document.getElementById(`user_${data._id}`)
    
    if(!existsUserInDiv) {
      addUserInList(data)
    }

  })

  socket.emit("start", {
    name,
    email,
    avatar
  })

  socket.emit("get_users", (users) => {
    users.filter(user => user.email != email).map(user => addUserInList(user))
  })

  socket.on("message", data => {
    if(data.message.roomId === roomId)
    addMessage(data)
  })

  socket.on("notification", (data) => {
    if(data.roomId !== roomId) {
      const user = document.getElementById(`user_${data.from._id}`)
  
      user.insertAdjacentHTML('afterbegin', `
        <div class="notification"></div>
      `)
    }
  })
}

const addUserInList = (user) => {
  const element = document.getElementById("users_list")

  element.innerHTML += `
    <li class="user_name_list" id="user_${user._id}" idUser="${user._id}">
      <img class="nav_avatar" src="${user.avatar}" />${user.name}
    </li>
  `
}

const addMessage = (data) => {
  document.getElementById("message_user").innerHTML += `
    <span class="user_name user_name_date">
      <img
        class="img_user"
        src=${data.user.avatar}
      />
      <strong>${data.user.name}</strong>
      <span>${dayjs(data.message.created_at).format("DD/MM/YYYY HH:mm")}</span>
    </span>
    <div class="messages">
      <span class="chat_message">${data.message.text}</span>
    </div>
  `
}

document.getElementById("users_list").addEventListener("click", (event) => {
  document.getElementById("message_user").innerHTML = ""

  document.querySelectorAll("li.user_name_list").forEach(user => user.classList.remove("user_in_focus"))
  
  const inputMessage = document.getElementById("user_message")
  inputMessage.classList.remove("hidden")

  if(event.target && event.target.matches("li.user_name_list")) {
    const userId = event.target.getAttribute("idUser")

    event.target.classList.add("user_in_focus")

    const notification = document.querySelector(`#user_${userId} .notification`)
    
    if(notification) {
      notification.remove()
    }

    socket.emit("start_chat", { userId }, ({ room, messages }) => {
      roomId = room.idChatRoom
      messages.map(message => {
        addMessage({
          message,
          user: message.to
        })
      })

      console.log(roomId)
    })
  }
})

document.getElementById("user_message").addEventListener("keypress", (event) => {
  if(event.key === 'Enter') {
    const message = event.target.value
    
    socket.emit('send_message', { roomId, message })

    event.target.value = ""
  }
})

onLoad()