const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const nextHandler = nextApp.getRequestHandler();
const ip = require('ip');

let dataSocket = [{
  id: 1,
  text: 'Hola',
}]

/* io.on('connection', (socket) => {
  socket.on('join', (room) => {
    socket.join(room)
    socket.on('message', (data) => {
      console.log(data);
      dataSocket = data;
      socket.broadcast.to(room).emit('message', data);
    });
  })
});*/

io.on('connection', socket => {
  socket.on('message', (data) => {
    dataSocket.push(data);
    socket.broadcast.emit('message', data)
    console.log('socket - broadcast');
  })
})

nextApp.prepare().then(() => {

  app.get('/messages', (req, res) => {
    res.json(dataSocket);
  })

  app.get('*', (req, res) => {
    return nextHandler(req, res)
  })

  server.listen(3000, (err) => {
    if (err) process.exit(0)
    console.log(`> On your local: http://localhost:3000`);
    console.log(`> On your network: http://${ip.address()}:3000`);
  });

})
