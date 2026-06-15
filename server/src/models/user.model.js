// import mongoose from "mongoose";
//Also Use this method to require package.
const  mongoose = require("mongoose");
//Extract the Schema constructor
const { Schema } = mongoose;//Also, const Schema =mongoose.schema

//Define differennt type of user Schema (Business Man, Salaried perason, Student)
const businessProfileSchema=new Schema(
    {
        businessName:{
            tyoe:string,
            trim:true,
            default:null,
        },
        gstNumber:{
            type:String,
            trim:true,
            default:null
        },
        businessType:{
            type:string,
            enum:['sole_proprietor','partnership','pvt_ltd','llp','other'],
            default:null,
        },
        industry:{
            type:String,
            trim:true,
            default:null,
        }
        
    },
     {_id:false}  // embedded object no separate_id needed
);

const salariedProfileSchema = new Schema(
    {
        employerName: {
            type:String,
            trim:true,
            default:null
        },
        designation:{
            type:String,
            trim:true,
            default:null,
        },
        montlySalary: {
            type: Number, 
            default:null,
        },
        salaryDay:{
            type:Number,
            min:1,
            max:31, 
            default:null
        },
    },
    {_id:false}
);


const studentProfileSchema = new Schema(
  {
    institutionName:{
        type: String, 
        trim: true, 
        default: null 
    },
    course:{ 
        type: String, 
        trim: true, 
        default: null 
    },
    graduationYear:{ 
        type: Number, 
        default: null 
    },
    monthlyAllowance:{
         type: Number, 
         default: null 
        },
  },
  { _id: false }
);



//Define User Schema
const userSchema= new Schema (
    {
        name: {
            type: String,
            required: [true,'Name is required'],
            trim : true ,//data validation libraries to automatically remove extra space from the beginning and end of text field before saving them
            maxlength :100,
        },
        email:{
            type:String,
            required:[true, 'Email is required'],
            unique :true,
            lowercase: true,
            trim:true,
        },
        Password:{
            type:String,
            required:[true, 'Password is required'],
            select:false,//Hidden by default 
        },
        phone:{
            type: String,
            trim:true, 
            default:null
        },
    //User category
        userType:{
            type:String,
            enum: ['business','salaried','student'],
            required:true,
        },
    //Only one of these will be populated based on userType
        businessProfile:{
            type:businessProfileSchema, 
            default:null,
        },
        salariedProfile:{
            type:salariedProfileSchema,
            default:null,
        },
        studentProfile:{
            type:studentProfileSchema,
            default:null,
        },
    //other details...
        currency:{
            type:String,
            enum:['INR','USD','AUR','GBP'],
            default: 'INR',

        },
        plan:{
            type:string,
            enum:['free','pro','premium'],
            default: 'free'
        },
        isVerified:{
            type :Boolean,
            default:false,

        },
        lastloginAt:{
            type:Date,
        },
        
        
});
//for avoid duplicate account data into database inddex=>Primary key is email id.
userSchema.index({ email: 1 });
// create mongoose model
const User =mongoose.model('User', userSchema);

module.exports = User;
