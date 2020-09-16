class Request {

  //converts 32 bit positive int to 32 bit buffer
  static int32_to_buffer(number){
    if(number<0) throw Error(" Request.int32_to_buffer INVALID INPUT, number should be a positive integers")
    const buffer = Buffer.alloc(4)
    for(var i=0; i<4; i++){
      buffer[i] = number%256; number/=256
    }
    return buffer
  }

  //converts 32 bit buffer to
  static buffer_to_int32(buffer){
    var number = 0
    for(var i=0; i<4; i++){
      number += Number(buffer[i]) * (256**i)
    }
    return number
  }

  static introspect_to_buffer(content){
    if((content instanceof Array)||(content instanceof Buffer)||(content instanceof Uint8Array)) return Buffer.concat([Buffer.from('b'), Buffer.from(content)])
    if(typeof content == 'string') return Buffer.concat([Buffer.from('s'), Buffer.from(content)])
    if(typeof content == 'object') return Buffer.concat([Buffer.from('o'), Buffer.from(JSON.stringify(content))])
    throw Error("Invalid Content")
  }

  static introspect_from_buffer(buffer){
    if(buffer.length<1) throw Error("Invalid Buffer")
    const type = String(buffer.slice(0,1))
    if(type == 'b') return buffer.slice(1, buffer.length)
    if(type == 's') return String(buffer.slice(1, buffer.length))
    if(type == 'o') return JSON.parse(String(buffer.slice(1, buffer.length)))
  }

  static capsule(h, b){
    const header = Request.introspect_to_buffer(h)
    const header_size = Request.int32_to_buffer(header.length)
    const body = Request.introspect_to_buffer(b)
    const body_size = Request.int32_to_buffer(body.length)
    return Buffer.concat([header_size, body_size, header, body])
  }

  static antonym(buffer, callback=null){
    try{
      const header_size = Request.buffer_to_int32(buffer.slice(0,4)),
            body_size = Request.buffer_to_int32(buffer.slice(4,8))
      const header = Request.introspect_from_buffer(buffer.slice(8,8+header_size)),
            body = Request.introspect_from_buffer(buffer.slice(8+header_size, 8+header_size+body_size))
      if(callback) callback(null, header, body) //error, header object, body
      return {header:header, body:body}
    }catch(e){
      if(callback) callback(e, null, null) //error, header object, body
      return {error:e, header:null, body:null}
    }
  }
}
