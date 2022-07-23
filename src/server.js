import express from "express";

const path = require("path");

const app = express();
app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static(path.join(__dirname, "/public")));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log("listen on http://localhost:3000");
app.listen(3000, handleListen);
