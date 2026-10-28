import { createServer } from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = await realpath(resolve(dirname(fileURLToPath(import.meta.url)), '../site'));
const contentTypes = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.json':'application/json; charset=utf-8' };
const port = Number(process.env.PORT || 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be 1–65535');

const server = createServer(async (request, response) => {
  if (!['GET','HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow:'GET, HEAD' }); response.end(); return;
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    if (pathname.includes('\0')) throw new Error('Invalid path');
    const candidate = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    const file = await realpath(candidate);
    if (!file.startsWith(root + sep) || !(await stat(file)).isFile()) {
      response.writeHead(404); response.end('Not found'); return;
    }
    const data = await readFile(file);
    response.writeHead(200, { 'Content-Type':contentTypes[extname(file)] || 'application/octet-stream', 'Content-Length':data.length, 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch {
    response.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); response.end('Not found');
  }
});
server.on('error', (error) => { console.error(error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`Studio KWONYC preview: http://127.0.0.1:${port}/`));
for (const signal of ['SIGINT','SIGTERM']) process.on(signal, () => server.close());
