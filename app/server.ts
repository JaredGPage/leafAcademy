import { createRequestHandler } from "@remix-run/node";
import { createServer } from "http";
import * as serverBuild from "@remix-run/dev/server-build";
import { installGlobals } from "@remix-run/node";
import { parse } from "url";

installGlobals();

const port = process.env.PORT || 3000;

const server = createServer(async (req, res) => {
  const remixHandler = createRequestHandler({
    build: serverBuild,
    mode: process.env.NODE_ENV,
  });

  const parsedUrl = parse(req.url || "");

  const request = new Request(parsedUrl.href, {
    method: req.method,
    headers: req.headers as any,
    body: req.method !== "GET" && req.method !== "HEAD" ? req : null,
  });

  const response = await remixHandler(request);

  res.writeHead(response.status, response.headers.raw());
  response.body?.pipe(res);
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});