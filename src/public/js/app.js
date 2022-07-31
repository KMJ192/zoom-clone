// const socket = new WebSocket(`ws://${window.location.host}`);
// const messageList = document.querySelector("ul");
// const messageForm = document.querySelector("#message");
// const nickNameForm = document.querySelector("#nick");

// function makeMessage(type, payload) {
//   const msg = { type, payload };
//   return JSON.stringify(msg);
// }

// socket.addEventListener("open", () => {
//   console.log("connected from server");
// });

// socket.addEventListener("message", (message) => {
//   // console.log("just got this:", message, "front the server");
//   const li = document.createElement("li");
//   li.innerText = message.data;
//   messageList.append(li);
// });

// socket.addEventListener("close", () => {
//   console.log("disconnect from server");
// });

// function handleSubmit(event) {
//   event.preventDefault();

//   const input = messageForm.querySelector("input");
//   socket.send(makeMessage("new_msg", input.value));
//   input.value = "";
// }

// function handleNickSubmit(event) {
//   event.preventDefault();
//   const input = nickNameForm.querySelector("input");
//   socket.send(makeMessage("nickname", input.value));
// }

// messageForm.addEventListener("submit", handleSubmit);
// nickNameForm.addEventListener("submit", handleNickSubmit);

const socket = window.io();

const welcom = document.querySelector("#welcome");
const form = welcom.querySelector("form");

function doneFromServer(msg) {
  console.log(msg);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", { payload: input.value }, doneFromServer);
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
