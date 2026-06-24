const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken =require("../utils/jwt.utility");

const register = async (req, res)=>{
    try{
        const {name,email, password ,userType} = req.body;

        const existing =await User.findOne({email});

        if (existing){
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword =await bcrypt.hash(password,10);
      

        const user =await User.create({name,email, password:hashedPassword,userType});

        res.status(201).json({
            message:"User registered",
            token:generateToken(user._id)//2nd time registerd user through postman: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhM2FlMmYyMmYxNWFhNjMyNTU3MWNjOCIsImlhdCI6MTc4MjI0NDA4MiwiZXhwIjoxNzgyODQ4ODgyfQ.SWr2mO199vdZreEgJfWMJKrcL7vIAe5rBJqxQyTUhOE"
        });

    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

const login = async (req,res)=>{
    try{
        const {email, password}= req.body;
        const user= await User.findOne({email}).select("+password");

        if (!user){
            return res.status(401).json({message:"invalid credential"});
        }

        // console.log(user);
        // console.log(user.Password)
        // console.log(user.password); =>{for error debugging use this 3 line of code}-->observation password "select:false" in user schema so directly we can not acess for that use ".select("+password")" during find useremail.
        const match = await bcrypt.compare(password,user.password);


    if(!match){
        return res.status(401).json({
            message:"Invalid credential"
        });
    }
    res.json({
        token: generateToken(user._id)
    });
}catch(err){
    console.log(err.message);
    res.status(500).json({
        message: err.message
    });
}

};

module.exports ={register,login};