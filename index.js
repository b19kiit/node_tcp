const Request = require('./src/request.js')
const TCPServer = require('./src/server');

module.exports.Request = Request;
module.exports.TCPServer = TCPServer;


const server = new TCPServer(8800, (socket)=>{

  socket.on('say', async (data)=>{
    console.log(`Client Says - ${data}`)
  })

  socket.on_close(()=>{
    console.log("Client closed the connection");
  })
  socket.on_disconnect(()=>{
    console.log("Client is disconnected");
  })

  console.log("client connected", socket.data_inflow_event_list)

  socket.emit('say', "Hey We are Connected")
})

//parentPort.postMessage("server ready")
