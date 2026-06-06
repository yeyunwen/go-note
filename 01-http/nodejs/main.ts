// Go: net/http + ServeMux；Node 用内置 http 模块

import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';

const routes: Record<string, (res: ServerResponse) => void> = {
  '/': (res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Hello from Node local server!\n');
  },
  '/healthz': (res) => {
    res.statusCode = 200;
    res.end('ok');
  },
};

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const handler = routes[req.url ?? ''];
  if (handler) {
    handler(res);
    return;
  }
  res.statusCode = 404;
  res.end('not found');
});

const port = 8080;
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
