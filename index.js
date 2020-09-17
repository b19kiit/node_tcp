const Request = require('./src/request.js')
const TCPServer = require('./src/server.js')
const TCPClient = require('./src/client.js')

module.exports.Request = Request;
module.exports.TCPServer = TCPServer;
module.exports.TCPClient = TCPClient;

//UNIT TESTS

//server
/*
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
*/

//Client
/*
const cli = new TCPClient({port:8800}, (socket)=>{
  cli.on('say', (data)=>{
    console.log(`Server Says - ${data.toString()}`)
    socket.emit('say', "Yes we are connect :-)")
    setTimeout(()=>{
      cli.socket.end()
    }, 1000)
  })
  //console.log(cli.data_inflow_event_list);
})
*/
