const {ErrorResponse} = require('../helper_class/json_response_class')
const path  = require('path')

const MB = 3
const file_size = MB*1024*1024
const allowedExtensions = ['.png','.jpg','.jpeg']

exports.uploadFileValidator = (req,res,nxt)=>{
    if(!req.files?.profile_picture)
    return res.status(400).json(
        new ErrorResponse({
            message:"Missing files",
            statusCode:400,
        })
    )

    let file = req.files.profile_picture;

    if(file.size > file_size){
        return res.status(413).json(
            new ErrorResponse({
                message:"File too large",
                statusCode:413,
                error:{
                    "profile_picture":[
                        `file too large(accepted=>${MB}mb)`
                    ]
                }
            })
        ) 
    }
    if(!allowedExtensions.some((ext)=>ext==path.extname(file.name))){
        return res.status(422).json(
            new ErrorResponse({
                message:"Validation Error",
                statusCode:422,
                error:{
                    "profile_picture":[
                        `file type not allowed(accepted=>['png','jpg','jpeg'])`
                    ]
                }
            })
        )
    }

    nxt()
}