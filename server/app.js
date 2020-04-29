const express = require('express');
const app = express();

const server = app.listen(3001, function(){
    console.log('server is running on port 3001')
});

const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log(socket.id)

  socket.on('SEND_MESSAGE', data => {
    io.emit('MESSAGE', data)
  })
})