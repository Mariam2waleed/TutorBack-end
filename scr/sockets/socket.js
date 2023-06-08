
const socketIO = require('socket.io');

function initializeSocket(server) {
  const io = socketIO(server);


  const connectedUser = new Set();

  io.on('connection', (socket) => {
    console.log('Connection established', socket.id);
    // connectedUser.add(socket.id);
    // io.emit('connected-user', connectedUser.size);
    
    // Add your socket event handlers and logic here
    socket.on('disconnect', () => {
      console.log("Disconnected", socket.id);
      // connectedUser.delete(socket.id);
      // io.emit('connected-user', connectedUser.size);
    });
    socket.on('message',(data)=> {
      console.log(data);
      socket.broadcast.emit('message-receive', data);
    });
  });
}

module.exports = initializeSocket;