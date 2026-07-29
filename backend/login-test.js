const http = require('http');

const data = JSON.stringify({
  email: 'admin@remakojayaabadi.com',
  password: 'Password123!',
});

const req = http.request({
  hostname: 'localhost',
  port: 1337,
  path: '/admin/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
}, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', body);
  });
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
