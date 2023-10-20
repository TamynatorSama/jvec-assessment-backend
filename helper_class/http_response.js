const http = require('http');
module.exports = class HttpResponse{

    constructor({res=null}){

        if(!(res instanceof http.ServerResponse )) {
           throw(TypeError('invalid parameters'))

        }
        this.response = res;

    }

    send({header={},body,statusCode=200}){
        if(!this.response){
            this.response.end();
            return;
        }

        if(!(header instanceof Object &&body instanceof Object)) {
            this.response.end();
            throw(TypeError('invalid parameters'))
 
         }
         this.all_header= {"Content-Type":"application/json",...header}
 
         this.statusCode = statusCode
 
         for (let key in this.all_header) {
            this.response.setHeader(key,this.all_header[key])
         }
         this.response.statusCode = this.statusCode;
         this.response.write(JSON.stringify(body))
        this.response.end();
    }
}