const http = require('http');
const fs = require('fs');
const path = require('path');
const port = parseInt(process.argv[2] || '3972', 10);

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };

http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  const file = url === '/' ? '/index.html' : url;
  const fp = path.join(__dirname, file);
  const ext = path.extname(fp);

  fs.readFile(fp, (err, data) => {
    if (err) {
      res.writeHead(url === '/health' ? 200 : 404, { 'Content-Type': 'text/plain' });
      res.end(url === '/health' ? 'ok' : 'Not found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'public, max-age=300',
    });
    res.end(data);
  });
}).listen(port, () => console.log(`Ayrshire Hub on :${port}`));
