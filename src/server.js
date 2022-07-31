import http from "http";
// import WebSocket from "ws";
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
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (...datas) => {
    console.log(datas[0]);
    datas[1]("done from server");
  });
});

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
