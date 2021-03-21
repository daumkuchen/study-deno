import { serve } from "https://deno.land/std@0.89.0/http/server.ts";

const port = 8000;
const s = serve({
  port: port
});

console.log("http://localhost:8000/");

for await (const req of s) {
  req.respond({
    body: "Hello Deno World\n"
  });
}