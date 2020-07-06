const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io').listen(server);
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const nextHandler = nextApp.getRequestHandler();
const ip = require('ip');

let dataSocket = {
  'room1': [{
    id: 1,
    text: 'Hola 1',
  }],
  'room2': [{
    id: 1,
    text: 'Hola 2',
  }]
}

io.on('connection', (socket) => {

  socket.on('join', (room) => {
    socket.join(room);
    socket.on('message', (data) => {
      dataSocket[room].push(data);
      socket.broadcast.to(room).emit('message', dataSocket[room]);
      socket.broadcast.emit('admin', dataSocket);
    });
  });

});

nextApp.prepare().then(() => {

  app.get('/messages/admin', (req, res) => {
    res.json(dataSocket);
  });

  app.get('/messages/:room', (req, res) => {
    res.json(dataSocket[req.params.room]);
  });

  app.get('*', (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(3000, (err) => {
    if (err) process.exit(0);
    console.log(`> On your local: http://localhost:3000`);
    console.log(`> On your network: http://${ip.address()}:3000`);
  });

});
