const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("connected from server");
});

socket.addEventListener("message", (message) => {
  console.log("just got this:", message, "front the server");
});

socket.addEventListener("close", () => {
  console.log("disconnect from server");
});

setTimeout(() => {
  socket.send("hello from the browser!");
}, 5000);
