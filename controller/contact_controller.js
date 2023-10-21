const connect = require("../database/db_connect")
const ContactModel = require('../model/user_model')

exports.createContact= async(req,res)=>{
    const db = await connect.connect();
    let createdUser = await db.collection("customers").insertOne(
        new ContactModel({
            firstName:"Samuel",
            lastName:"Kolawole",
            phoneNumber: "09063976031",
            email:"Kolaowletamilore1@gmail.com"
    
        }).toJson()
    )
    res.send({
        statusCode:201,
        body:{
            message:"contact Created Successfully",
        },
    })
}
exports.allContact=async(req,res)=>{
    const db = await connect.connect();
    let contactList = await db.collection("customers").find().toArray()
    console.log(new ContactModel({
        firstName:"Samuel",
        lastName:"Kolawole",
        phoneNumber: "09063976031",
        email:"Kolaowletamilore1@gmail.com"

    }).toJson())
    
    res.send({
        body:{
            message:"all contacts",
            result:[]
        }
    })
}
exports.singleContact=(req,res)=>{}
exports.updateContact=(req,res)=>{}
exports.deleteContact=(req,res)=>{}