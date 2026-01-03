import app from "./app.js";
import "./socket.js";
import dotenv from "dotenv";

dotenv.config();
const { server } = app;
const PORT = process.env.PORT || 3333;

server.listen(PORT, () =>
  console.log(`Servidor Http em: http://localhost:${PORT}`)
);
