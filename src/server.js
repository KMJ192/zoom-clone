// import WebSocket from "ws";
import http from "http";
import SocketIO from "socket.io";
import express from "express";

const path = require("path");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static(path.join(__dirname, "/public")));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);

// 2. Socket.io
const wsServer = SocketIO(httpServer);

// function publicRooms() {
//   const {
//     sockets: {
//       adapter: { sids, rooms },
//     },
//   } = wsServer;
//   const publicRooms = [];

//   rooms.forEach((_, key) => {
//     if (sids.get(key) === undefined) {
//       publicRooms.push(key);
//     }
//   });

//   return publicRooms;
// }

// function countRoom(roomName) {
//   return wsServer.sockets.adapter.rooms.get(roomName)?.size;
// }

// wsServer.on("connection", (socket) => {
//   socket["nickname"] = "Anon";
//   socket.onAny((event) => {
//     // console.log(wsServer.sockets.adapter);
//     // console.log(`Socket Event: ${event}`);
//   });

//   socket.on("enter_room", (roomName, showRoom) => {
//     const { payload: name } = roomName;
//     socket.join(name);
//     showRoom();
//     socket.to(name).emit("welcome", socket.nickname, countRoom(name));
//     wsServer.sockets.emit("room_change", publicRooms());
//   });

//   // socket room을 떠나기 직전
//   socket.on("disconnecting", () => {
//     socket.rooms.forEach((room) =>
//       socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1)
//     );
//   });

//   // socket room을 떠난 후
//   socket.on("disconnect", () => {
//     wsServer.sockets.emit("room_change", publicRooms());
//   });

//   socket.on("new_message", (msg, room, done) => {
//     socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
//     done();
//   });
//   socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
// });

// 1. Web Socket
// const wss = new WebSocket.Server({ server: httpServer });
// const sockets = [];
// function onSocketClose() {
//   console.log("disconnect from browser");
// }
// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "annon";
//   console.log("connect to browser");
//   socket.on("close", onSocketClose);
//   socket.on("message", (message) => {
//     try {
//       const { type, payload } = JSON.parse(message);
//       switch (type) {
//         case "new_msg":
//           sockets.forEach((aSocket) =>
//             aSocket.send(`${socket.nickname} : ${payload}`)
//           );
//           return;
//         case "nickname":
//           socket["nickname"] = payload;
//           return;
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   });
// });

// server.listen(3000, handleListen);

const handleListen = () => console.log("Listen on http://localhost:3000");
httpServer.listen(3000, handleListen);
