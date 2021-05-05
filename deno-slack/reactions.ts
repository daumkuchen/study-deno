import "https://deno.land/x/dotenv@v2.0.0/load.ts"
import { SocketModeClient } from "https://deno.land/x/slack_socket_mode@1.0.1/mod.ts"

const appToken = Deno.env.get('SLACK_APP_TOKEN')
const socketModeClient = new SocketModeClient({
  appToken
});

socketModeClient.addEventListener('reaction_added', ({ detail: { body, ack } }) => {
  ack()
  console.log('reaction_added\n', body)
});

await socketModeClient.start()