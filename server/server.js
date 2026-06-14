//line 2 & 3 about webcrypto what is this and how it affect during connecting Mongo Database (Remore this comment and update during debugging and testing)
const { webcrypto } = require('crypto');
global.crypto = webcrypto;

let PORT;
const app =require('./src/app');
const connectDB =require('./src/db/db');

//for using .env file var require dotenv package
require('dotenv').config()

connectDB();


app.listen(process.env.PORT || 4000 ,()=>{
    console.log(`Server is running at port no. ${process.env.PORT || 4000}`);
})