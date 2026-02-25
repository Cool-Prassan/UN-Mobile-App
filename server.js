const http = require('http');
const fs = require('fs');
const path = require('path');

const mimes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.csv': 'text/csv',
};

http.createServer((req, res) => {
  let p = req.url === '/' ? '/index.html' : decodeURIComponent(req.url.split('?')[0]);
  const fp = path.join(__dirname, p);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    const ext = path.extname(fp);
    res.writeHead(200, { 'Content-Type': mimes[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(3000, () => console.log('Server running on http://localhost:3000'));
