// 1. Web Socket
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

// 2. Socket.io
// const socket = window.io();

// const welcom = document.querySelector("#welcome");
// const form = welcom.querySelector("form");

// const room = document.getElementById("room");

// room.hidden = true;

// let roomName = "";

// function addMessage(msg) {
//   const ul = room.querySelector("ul");
//   const li = document.createElement("li");

//   li.innerText = msg;
//   ul.appendChild(li);
// }

// function handleMessageSubmit(event) {
//   event.preventDefault();
//   const input = room.querySelector("#msg input");
//   socket.emit("new_message", input.value, roomName, () => {
//     addMessage(`You: ${input.value}`);
//     input.value = "";
//   });
// }

// function handleNicknameSubmit(event) {
//   event.preventDefault();
//   const input = room.querySelector("#name input");
//   const { value } = input;
//   socket.emit("nickname", value);
//   input.value = "";
// }

// function showRoom() {
//   welcom.hidden = true;
//   room.hidden = false;
//   const h3 = room.querySelector("h3");
//   h3.innerText = `Room ${roomName}`;

//   const msgForm = room.querySelector("#msg");
//   const nameForm = room.querySelector("#name");
//   msgForm.addEventListener("submit", handleMessageSubmit);
//   nameForm.addEventListener("submit", handleNicknameSubmit);
// }

// function handleRoomSubmit(event) {
//   event.preventDefault();
//   const input = form.querySelector("input");
//   socket.emit("enter_room", { payload: input.value }, showRoom);
//   roomName = input.value;
//   input.value = "";
// }

// form.addEventListener("submit", handleRoomSubmit);

// socket.on("welcome", (user, newCount) => {
//   const h3 = room.querySelector("h3");
//   h3.innerText = `Room ${roomName} (${newCount})`;
//   addMessage(`${user} arrived!`);
// });

// socket.on("bye", (left, newCount) => {
//   const h3 = room.querySelector("h3");
//   h3.innerText = `Room ${roomName} (${newCount})`;
//   addMessage(`${left} left ㅠㅠ`);
// });

// socket.on("new_message", addMessage);

// socket.on("room_change", (rooms) => {
//   const roomList = welcom.querySelector("ul");
//   roomList.innerHTML = "";
//   if (rooms.length === 0) {
//     return;
//   }
//   rooms.forEach((room) => {
//     const li = document.createElement("li");
//     li.innerText = room;
//     roomList.append(li);
//   });
// });

// 3. WebRTC
const socket = io();

const myFace = document.getElementById("myFace");
const ms = document.getElementById("myStream");
const muteBtn = ms.querySelector("#mute");
const cameraBtn = ms.querySelector("#camera");
const camerasSelect = document.getElementById("cameras");

let myStream;
let muted = false;
let cameraOff = false;

function handleMuteClick() {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}
function handleCameraClick() {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  }
}

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const currentCamera = myStream.getVideoTracks()[0];
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMedia(deviceId) {
  const initialConstraints = {
    autio: true,
    video: { facingMode: "user" },
  };

  const cameraConstaints = {
    audio: true,
    video: {
      deviceId: {
        exact: deviceId,
      },
    },
  };

  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstaints : initialConstraints
    );
    myFace.srcObject = myStream;
    await getCameras();
  } catch (e) {
    console.log(e);
  }
}

async function handleCameraChange() {
  await getMedia(camerasSelect.value);
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
camerasSelect.addEventListener("input", handleCameraChange);

getMedia();
