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
}

const addUserInList = (user) => {
  const element = document.getElementById("users_list")

  element.innerHTML += `
    <li class="user_name_list" id="user_${user._id}" idUser="${user._id}">
      <img class="nav_avatar" src="${user.avatar}" />${user.name}
    </li>
  `
}

document.getElementById("users_list").addEventListener("click", (event) => {
  if(event.target && event.target.matches("li.user_name_list")) {
    const userId = event.target.getAttribute("idUser")

    socket.emit("start_chat", { userId }, (room) => {
      console.log(room)
      // roomId = room.idChatRoom
    })
  }
})

onLoad()