// const httpServer = http.createServer(app);

// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:3001",
//     methods: ["GET", "POST"]
//   }
// });
require('dotenv').config()
const httpServer = require("http").createServer();
// const io = require('socket.io')(httpServer,{
//   cors: {
//     origin: [process.env.CLIENT_URI],
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
// });
const io = require("socket.io")(3001,{
  
    handlePreflightRequest: function (req, res) {
        var headers = {
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Origin': process.env.CLIENT_URI,
          'Access-Control-Allow-Methods': 'GET,POST',
          'Access-Control-Allow-Credentials': true
        };
        res.writeHead(200, headers);
        res.end();
      }
  });

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on("new-message", (data) => {
    socket.broadcast.emit("incoming-message", data)
  });
});
// httpServer.listen(3001,()=>{console.log('listening on port 3001')});