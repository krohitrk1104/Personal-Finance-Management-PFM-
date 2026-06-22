//To encounter this error in connecting mongodb 2&3 add==>{"querySrv ECONNREFUSED _mongodb._tcp.cluster-pfm.ruxs5xn.mongodb.net" }
const dns = require('node:dns');
dns.setServers(['1.1.1.1', '1.0.0.1']); // Forces Cloudflare DNS
// require('dotenv').config
const { configDotenv } = require('dotenv');
//require mongoose package
const mongoose =require('mongoose');


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