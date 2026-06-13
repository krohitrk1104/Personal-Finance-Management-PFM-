//line 2 & 3 about webcrypto what is this and how it affect during connecting Mongo Database
const { webcrypto } = require('crypto');
global.crypto = webcrypto;

const app =require('./src/app');
const connectDB =require('./src/db/db');

connectDB();


app.listen(3000,()=>{
    console.log("Server is running at port no. 3000");
})