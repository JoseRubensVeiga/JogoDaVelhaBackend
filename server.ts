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

    if (message.action === "restart") {
      game.clear();
      ws.send(game.toString());
      return;
    }

    if (message.playerName) {
      if (message.player === "1") {
        game.xPlayerName = message.playerName;
      }

      if (message.player === "2") {
        game.oPlayerName = message.playerName;
      }
    } else {
      game.updateGame(message);
    }

    wss.clients.forEach((c) => c.send(game.toString()));
  });

  ws.send(game.toString());
});

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server started!`);
});
