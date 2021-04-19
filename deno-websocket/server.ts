import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.1/lib/websocket.ts";

const server = new WebSocketServer();

server.on("connection", (client: WebSocketClient) => {
  console.log("socket connected!");
	client.on("message", (message: string) => {
    console.log(message);
		client.send(message)
  });
});