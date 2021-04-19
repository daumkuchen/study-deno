import {
  encode,
  BufReader,
  TextProtoReader,
  green, red
} from "https://deno.land/x/websocket@v0.1.1/example/deps.ts";
import { WebSocketClient, StandardWebSocketClient } from "https://deno.land/x/websocket@v0.1.1/lib/websocket.ts";

const endpoint = Deno.args[0] || "ws://127.0.0.1:8080";
const client: WebSocketClient = new StandardWebSocketClient(endpoint);

client.on("open", () => {
  Deno.stdout.write(encode(green("ws connected! (type 'close' to quit)\n")));
  Deno.stdout.write(encode("> "));
});

client.on("message", (message: string) => {
  Deno.stdout.write(encode(`${message}\n`));
  Deno.stdout.write(encode("> "));
});

try {
  const promise = async (): Promise<void> => {
    const tpr = new TextProtoReader(new BufReader(Deno.stdin));
    while (true) {
      const line = await tpr.readLine();
      if (line === null || line === "close") {
        break;
      } else if (line === "ping") {
        await client.ping();
      } else {
        await client.send(line);
      }
    }
  };
  await promise().catch(console.error);
  if (!client.isClosed) {
    await client.close(1000).catch(console.error);
  }
} catch (err) {
  Deno.stderr.write(encode(red(`Could not connect to WebSocket: '${err}'`)));
}
Deno.exit(0);