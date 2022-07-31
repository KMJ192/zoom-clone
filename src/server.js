import http from "http";
import WebSocket from "ws";
import express from "express";

const path = require("path");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static(path.join(__dirname, "/public")));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log("listen on http://localhost:3000");
// app.listen(3000, handleListen);

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const sockets = [];

function onSocketClose() {
  console.log("disconnect from browser");
}

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "annon";
  console.log("connect to browser");
  socket.on("close", onSocketClose);
  socket.on("message", (message) => {
    try {
      const { type, payload } = JSON.parse(message);
      switch (type) {
        case "new_msg":
          sockets.forEach((aSocket) =>
            aSocket.send(`${socket.nickname} : ${payload}`)
          );
          return;
        case "nickname":
          socket["nickname"] = payload;
          return;
      }
    } catch (e) {
      console.log(e);
    }
  });
});

server.listen(3000, handleListen);

// {
//   type: 'message',
//   payload: 'hello everyone'
// }

// {
//   type: 'nickname',
//   payload: 'hello everyone'
// }
