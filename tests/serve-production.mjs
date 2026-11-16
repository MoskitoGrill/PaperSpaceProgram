// A plain static server with a real subdirectory, without SPA fallback.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const isTest = url.pathname.startsWith('/testing/PaperSpaceProgram/');
  const prefix = isTest ? '/testing/PaperSpaceProgram' : '/PaperSpaceProgram';
  const root = resolve(isTest ? 'dist-pages' : 'dist');
  if (!url.pathname.startsWith(prefix + '/')) { res.writeHead(404).end(); return; }
  const path = resolve(root, '.' + url.pathname.slice(prefix.length) + (url.pathname.endsWith('/') ? 'index.html' : ''));
  if (!path.startsWith(root + sep)) { res.writeHead(404).end(); return; }
  try {
    const file = await readFile(path);
    res.setHeader('Content-Type', ({ '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' })[extname(path)] ?? 'application/octet-stream');
    res.end(file);
  } catch { res.writeHead(404).end(); }
}).listen(4173, '127.0.0.1');
