const {TCPClient} = require('../../index.js');
const InputSync = require('inputsync');

(async()=>{
  const _client = await InputSync.getline(`
Client 1 disconnects on its own
Client 2 asks server to disconnects
Which Client (1/2) : `)
  if(_client == '1'){
    //Client 1
    //connecting to server listening to localhost:8800
    const cli1 = new TCPClient({port:8800}, (socket)=>{
      console.log("Client 1 - Connected to Server")

      // Adding function for data inflow with ID 'message'
      socket.on('message', (data)=>{
        console.log(`Server Says to Client 1 - ${data.toString()}`)

        //sending String data to client with ID message
        socket.emit('message', "Yes we are connect :-), BTW I am Client 1")

        //1 second later the connection with server should be closed
        setTimeout(()=>{
          console.log("Closing the connection");
          socket.socket.end()
        }, 1000)

      })

      // Adding function which should be triggered when Server closed the connection
      socket.on_close(()=>{
        console.log("Client 1 - Connection closed");
      })

      // Adding function which should be triggered when Server gets disconnected
      socket.on_disconnect(()=>{
        console.log("Client 1 - Server is disconnected");
      })
    })
  }
  else {
    //Client 2
    //connecting to server listening to localhost:8800
    const cli2 = new TCPClient({port:8800}, (socket)=>{
      console.log("Connected to Server")

      // Adding function for data inflow with ID 'message'
      socket.on('message', (data)=>{
        console.log(`Server Says to Client 2 - ${data.toString()}`)

        //sending String data to client with ID message
        socket.emit('message', "Yes we are connect :-), BTW I am Client 2")

        //1 second later client will emit with ID 'bored'
        setTimeout(()=>{
          console.log("Client 2 - Telling server that I am bored");
          socket.emit('bored', "Lets end this")
        }, 1000)

      })

  // Adding function which should be triggered when Client or Server closed the connection
      socket.on_close(()=>{
        console.log("Client 2 - Server closed the connection");
      })

      // Adding function which should be triggered when Server gets disconnected
      socket.on_disconnect(()=>{
        console.log("Client 2 - Server is disconnected");
      })
    })
  }
})()
