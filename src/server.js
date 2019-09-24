const http = require('http');
const app = require('./app');
const port = process.env.PORT || 9898;



const server = http.createServer(app);

server.listen(port, () =>
  console.log(`your server is running on port ${port}`)
);