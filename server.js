// Tiny static server for the APK download page. No packages needed, only Node.js.
const http = require('http'), fs = require('fs'), path = require('path'), os = require('os');
const root = __dirname;
const port = process.env.PORT || 8080;
const types = { '.html': 'text/html; charset=utf-8', '.apk': 'application/vnd.android.package-archive', '.css': 'text/css', '.js': 'text/javascript' };

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const f = path.join(root, p);
  if (f !== root && !f.startsWith(root + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(f, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); return res.end('Not found'); }
    const ext = path.extname(f).toLowerCase();
    const h = { 'Content-Type': types[ext] || 'application/octet-stream', 'Content-Length': st.size };
    if (ext === '.apk') h['Content-Disposition'] = 'attachment; filename="' + path.basename(f) + '"';
    res.writeHead(200, h);
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(f).pipe(res);
  });
}).listen(port, '0.0.0.0', () => {
  console.log('\nPalmSketch APK page is running.\n');
  console.log('  On this computer:  http://localhost:' + port);
  Object.values(os.networkInterfaces()).flat().filter((n) => n && n.family === 'IPv4' && !n.internal)
    .forEach((n) => console.log('  On your tablet:    http://' + n.address + ':' + port + '   (same Wi-Fi)'));
  const apk = path.join(root, 'apk', 'palmsketch.apk');
  console.log(fs.existsSync(apk) ? '\n  APK found: apk/palmsketch.apk\n' : '\n  No APK yet. Put your file at apk/palmsketch.apk\n');
});
