
const socketIO = require('socket.io');

function initializeSocket(server) {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('Connection established', socket.id);

    // Add your socket event handlers and logic here

    socket.on('disconnect', () => {
      console.log("Disconnected", socket.id);
    });
    socket.on('message',(data)=> {
      console.log(data);
      socket.broadcast.emit('message-receive', data);
    });
  });
}

module.exports = initializeSocket;