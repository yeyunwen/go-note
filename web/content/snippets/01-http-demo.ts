// 网站演示版：内存 mock 请求，无需 listen 长跑服务器
import { type IncomingMessage, type ServerResponse } from 'node:http';

const routes: Record<string, (res: MockResponse) => void> = {
  '/': (res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Hello from Node local server!\n');
  },
  '/healthz': (res) => {
    res.statusCode = 200;
    res.end('ok');
  },
};

class MockResponse {
  statusCode = 200;
  headers: Record<string, string> = {};
  body = '';

  setHeader(key: string, value: string): void {
    this.headers[key] = value;
  }

  end(chunk?: string): void {
    if (chunk !== undefined) {
      this.body = chunk;
    }
  }
}

function handleRequest(req: IncomingMessage, res: ServerResponse): void {
  const handler = routes[req.url ?? ''];
  if (handler) {
    handler(res as unknown as MockResponse);
    return;
  }
  res.statusCode = 404;
  res.end('not found');
}

function mockGet(path: string): void {
  const res = new MockResponse();
  handleRequest({ url: path } as IncomingMessage, res as unknown as ServerResponse);
  console.log(`GET ${path} -> ${res.statusCode} ${JSON.stringify(res.body)}`);
}

for (const path of ['/', '/healthz']) {
  mockGet(path);
}
