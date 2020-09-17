const Request = require('./request.js')

class TCPClient {
  constructor(options, callback=null) {
    const this_class = this
    try {
      this_class.data_inflow_event_list = {}

      this_class.socket = TCPClient.net.createConnection(options, () => {
        if(typeof callback == 'function') callback(this_class)
      })

      this_class.socket.on('data', (data)=>{
        try {
          console.log(data);
          const content = Request.antonym(data)
          if(content.error) throw content.error
          const id = content.header.id
          console.log(70, id);
          if((typeof id != 'string')&&(typeof id != 'number')) throw Error('bad server call')
          if(this_class.data_inflow_event_list[id] instanceof Function)
            this_class.data_inflow_event_list[id](content.body)

        } catch (e) {
          console.log(75, e);
        }
      })

      //disconnect_handler is a function that should be triggered in case of connection end
      this_class.disconnect_handler = null
      //manually closed connection handler function
      this_class.con_close_handler = null
      this_class.socket.on('end', (data)=>{
        //adding try catch block to pervent termination of the server
        this_class.socket.end()
        try {
          if (this_class.con_close_handler instanceof Function) this_class.con_close_handler()
        } catch (e) {
          console.error("ERROR ORIGINATED FROM ConSocket.disconnect_handler" + e)
        }
      })

    } catch (e) {
      throw Error('failed to connect\n'+e)
    }
  }
  emit(id, content){
    const this_class = this
    this_class.socket.write(Request.capsule({id:id}, content))
  }
  on(id, function_call){
    if(! (function_call instanceof Function)) throw Error("2nd Parameter should be function")
    this.data_inflow_event_list[id] = function_call
  }
  on_close(function_call){
    if(typeof function_call != 'function') throw Error("1st Parameter function_call should be type function")
    this.con_close_handler = function_call
  }
  on_disconnect(function_call){
    if(typeof function_call != 'function') throw Error("1st Parameter function_call should be type function")
    this.disconnect_handler = function_call
  }
  removeIdListener(id){
    this.data_inflow_event_list[id] = null
    delete this.data_inflow_event_list[id]
  }
  end(){
    this.socket.end()
  }
}
TCPClient.net = require('net')

module.exports = TCPClient;
