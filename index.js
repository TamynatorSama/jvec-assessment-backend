const { contentType } = require('express/lib/response');
const http = require('http');
const ResponseClass = require('./helper_class/http_response')
const getReq = require('./http_methods/get_request')
const postReq = require('./http_methods/post_request')
const putReq = require('./http_methods/put_request')
const deleteReq = require('./http_methods/delete_request')

require('dotenv').config();

const port  = process.env.PORT || 5001;

const server = http.createServer((req,res)=>{

    const response = new ResponseClass({res})

    switch(req.method){
        case "GET":
            getReq(req,response);
            break;
        case "Post":
            postReq(req,response);
            break;
        case "PUT":
            putReq(req,response);
            break;
        case "DELETE":
            deleteReq(req,response);
            break;
        default :
        response.send({})
    }

});

server.listen(port,()=>{
    console.log(`server start on port: ${port}`);
});
