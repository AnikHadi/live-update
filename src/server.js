import next from "next";
import { createServer } from "node:http";
import { parse } from "node:url";
import { WebSocket, WebSocketServer } from "ws";

const nextApp = next({ dev: process.env.NODE_ENV !== "production" });
const handle = nextApp.getRequestHandler();
const clients = new Set();

nextApp.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url || "", true);
    handle(req, res, parsedUrl);
  });

  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    clients.add(ws);

    console.log("> Client connected");

    ws.on("message", (message, isBinary) => {
      // console.log("> Message received:", message);
      clients.forEach((client) => {
        if (
          client.readyState === WebSocket.OPEN &&
          message.toString() !== `{"event": "ping"}`
        ) {
          client.send(message, { binary: isBinary });
        }
      });
    });

    ws.on("close", () => {
      // clients.delete(ws);
      console.log("> Client disconnected");
    });
  });

  server.on("upgrade", (request, socket, head) => {
    const { pathname } = parse(request.url || "/", true);

    if (pathname !== "/_next/webpack-hmr") {
      nextApp.getUpgradeHandler(request, socket, head);
    }

    if (pathname !== "/api/ws") {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    }
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
