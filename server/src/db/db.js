const { configDotenv } = require('dotenv');
const mongoose =require('mongoose');
// require('dotenv').config

async function connectDB(){
   try{
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("Connected to Mongodb DataBase");
   }
   catch(err){
    console.error("Database connection failed :", err.message );
    process.exit(1);
    }
}

module.exports =connectDB;