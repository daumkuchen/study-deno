import { serve } from "https://deno.land/std@0.89.0/http/server.ts";

const port = 8000;
const http_server = serve({
  port: port
});

console.log("http://localhost:8000/");

for await (const req of http_server) {
  req.respond({
    body: "Hello Deno World\n"
  });
}