const http = require('http'), fs = require('fs'), p = require('path');
const root = __dirname;
const types = { '.html': 'text/html', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon', '.css': 'text/css', '.js': 'text/javascript' };
http.createServer((req, res) => {
  let f = decodeURIComponent(req.url.split('?')[0]);
  if (f === '/') f = '/index.html';
  const fp = p.join(root, f);
  fs.readFile(fp, (e, d) => {
    if (e) { res.statusCode = 404; res.end('Not found'); return; }
    res.setHeader('Content-Type', types[p.extname(fp)] || 'application/octet-stream');
    res.end(d);
  });
}).listen(4322, () => console.log('Serendipity site running on http://localhost:4322'));
