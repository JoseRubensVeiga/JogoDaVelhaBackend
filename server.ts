import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import { Game } from "./src/app/Game";
import { Message } from "./src/interfaces/Message";

const app = express();
const server = http.createServer(app);
const game = new Game();
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (buffer: Buffer) => {
    const message: Message = JSON.parse(buffer.toString());

    if (message.player) {
      if (wss.clients.size === 1) {
        game.xPlayerName = message.player;
      }

      if (wss.clients.size === 2) {
        game.oPlayerName = message.player;
      }
    } else {
      game.updateGame(message);
    }

    wss.clients.forEach((c) => c.send(game.toString()));
  });

  ws.send(JSON.stringify(game));
});

server.listen(3000, () => {
  console.log(`Server started!`);
});
