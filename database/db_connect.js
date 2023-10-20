require('dotenv').config()
const{MongoClient} = require('mongodb')

const client =  new MongoClient(process.env.DB_CONNECTION_STRING)

exports.connect = async()=>{

        await client.connect();
        const db = client.db(process.env.DATABASE_NAME);
        return db;
    // }
    // catch(e){

    // }
}