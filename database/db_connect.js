require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.DB_CONNECTION_STRING)
    }catch(e){
        console.error(e)
    }
}
module.exports = connectDB