const http = require('http');
const app = require('./app');
const initializeSocket = require('./scr/sockets/socket');

const port = process.env.PORT || 8080;
const server = http.createServer(app);

initializeSocket(server); // Initialize socket.io

server.listen(port, () => {
    console.log("Mariam Server is working", port);
});
