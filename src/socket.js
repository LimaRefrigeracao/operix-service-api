import app from "./app.js";

const { io } = app;

io.on("connection", (socket) => {
  console.log("Websocket Conectado");
});
