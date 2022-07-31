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

wss.on("connection", (socket) => {
  console.log("connect to browser");

  socket.on("close", () => {
    console.log("disconnect from browser");
  });
  socket.on("message", (message) => {
    console.log(message.toString("utf-8"));
  });
  socket.send("hello");
});

server.listen(3000, handleListen);
