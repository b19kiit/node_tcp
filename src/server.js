const Request = require('./request.js')

//ConSocket is for managing session with a client
class ConSocket {
  constructor(socket) {
    const this_class = this //constant refrence to this
    this_class.data_inflow_event_list = {} //event specific functions are stored in data_inflow_event_list object
    this_class.socket = socket
    this_class.socket.on('data', (data)=>{ //'data' stores the raw buffer data sent by the client
      try {
        const content = Request.antonym(data) // decode raw buffer
        const id = content.header.id // if for event specific

        if((typeof id != 'string') && (typeof id != 'number')) throw Error('bad server call')

        //use data_inflow_event function only and only if it exists
        (this_class.data_inflow_event_list[id] && this_class.data_inflow_event_list[id](content.body))

      } catch (e) {
        //Error here is most likely to originate from fault on client side
        throw Error('Client Cluprit\n'+e)
      }
    })

    //disconnect_handler is a function that should be triggered in case of connection end
    this_class.disconnect_handler = null
    //manually closed connection handler function
    this_class.con_close_handler = null
    this_class.socket.on('end', (data)=>{
      //adding try catch block to pervent termination of the server
      try {
        (this_class.disconnect_handler && this_class.disconnect_handler())
      } catch (e) {
        console.error("ERROR ORIGINATED FROM ConSocket.disconnect_handler" + e)
      }
    })
  }

  //emit data to client
  emit(id, content){
    const this_class = this
    this_class.socket.write(Request.capsule({id:id}, content))
    console.log("sent 76");
  }

  //add id specific even lister to recive data from client
  on(id, function_call){
    if(typeof function_call != 'function') throw Error("2nd Parameter should be function")
    this.data_inflow_event_list[id] = function_call
  }

  //event to check connection close and trigger handler
  on_close(function_call){
    if(typeof function_call != 'function') throw Error("1st Parameter function_call should be type function")
    this_class.disconnect_handler = function_call
  }

  //event to check disconnection and trigger handler
  on_disconnect(function_call){
    if(typeof function_call != 'function') throw Error("1st Parameter function_call should be type function")
    this_class.disconnect_handler = function_call
  }

  //removing id specific even lister to recive data from client
  removeIdListener(id){
    this.data_inflow_event_list[id] = null
    delete this.data_inflow_event_list[id]
  }
}



class TCPServer {
  constructor(port, process_when_connected) {
    const this_class = this
    try {
      this_class.server = TCPServer.net.createServer((socket) => {
        //new user connects
        process_when_connected(new ConSocket(socket))
      })

      this_class.server.on('error', (err) => {
        console.log(err)
      })

      //binding server
      this_class.server.listen(port, () => {
        console.log('server bound to port'+port)
      })

    } catch (e) {
      throw Error('failed to connect\n'+e)
    }
  }
}
TCPServer.net = require('net')
