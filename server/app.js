const express = require('express');
const app = express();

const server = app.listen(3001, function(){
    console.log('server is running on port 3001')
});

const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log(socket.id)

  socket.on('SEND_MESSAGE', (data, room) => {
    io.to(room).emit('MESSAGE', data);
  });

  socket.on('JOIN_ROOM', data => {
    console.log('User joined room', data);
    socket.join(data);
    // io.sockets.emit('update', { message: socket.client.server.clients, type: 'online' });
  })
  
  socket.on('LEAVE_ROOM', data => {
    console.log('User joined room', data);
    socket.leave(data);
  })
  
  socket.on('disconnect', () => {
    // io.sockets.emit('update', { message: socket.client.server.clients, type: 'online' });
  })
})