const mongoose =require('mongoose');

async function connectDB(){
    await mongoose.connect("mongoDB connection string-Key");

    console.log("Connected to DB");
    
}

module.exports =connectDB;