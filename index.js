require('dotenv').config();
const express = require('express')
const app = express();
const appRouter = require('./router/index')
const connectDB = require('./database/db_connect')
const mongoose = require('mongoose')

const port  = process.env.PORT || 5001;

// middleware For parsing application/json
app.use(express.json());


app.use('/api',appRouter);

mongoose.connection.once('open',()=>{
    app.listen(port, function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", port);
    });
})
 




// const http = require('http');
// const ResponseClass = require('./helper_class/http_response')
// const getReq = require('./http_methods/get_request')
// const postReq = require('./http_methods/post_request')
// const putReq = require('./http_methods/put_request')
// const deleteReq = require('./http_methods/delete_request')

// require('dotenv').config();

// const port  = process.env.PORT || 5001;

// const server = http.createServer((req,res)=>{

//     const response = new ResponseClass({res})

//     switch(req.method){
//         case "GET":
//             getReq(req,response);
//             break;
//         case "POST":
//             postReq(req,response);
//             break;
//         case "PUT":
//             putReq(req,response);
//             break;
//         case "DELETE":
//             deleteReq(req,response);
//             break;
//         default :
//         response.send({
//             statusCode: 400,
//             body:{
//                 "messgae":"invalid method on route"
//             }
//         })
//     }

// });

// server.listen(port,()=>{
//     console.log(`server start on port: ${port}`);
// });
