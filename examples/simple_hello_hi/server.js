const {TCPServer} = require('../../index.js');

//Listen to port 8800
const server = new TCPServer(8800, (socket)=>{

  // Adding function for data inflow with ID 'message'
  socket.on('message', async (data)=>{
    console.log(`Client Says - ${data}`)
  })

  // Adding function for data inflow with ID 'bored'
  socket.on('bored', (data)=>{
    console.log(`Client Says - ${data}`)

    //Closing connection with client in 3 seconds
    setTimeout(()=>{
      console.log("Closing connection with client");
      socket.end()
    }, 3000)
  })

  // Adding function which should be triggered when Client or Server closed the connection
  socket.on_close(()=>{
    console.log("Connection closed");
  })

  // Adding function which should be triggered when Client gets disconnected
  socket.on_disconnect(()=>{
    console.log("Client is disconnected");
  })

  //sending String data to client with ID message
  socket.emit('message', "Hey We are Connected")
})
