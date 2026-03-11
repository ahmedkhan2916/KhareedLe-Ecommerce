// import { application } from "express";
import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"

    const adminSignupSchema = new Schema({

    firstname:{
        type:String,
        required:true,
        trim:true,
    },

    phonenumber:{
        type:Number,
        required:true,
    },

    password:{

    type:String,
    required:[true,"password is required"],

    },

    email:{

    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    },

    role:{
        type:String,
        enum:["admin","seller"],
        default:"seller",
    },

    storeName:{
        type:String,
        required:true,
        trim:true,
    },

    businessAddress:{
        type:String,
        required:true,
        trim:true,
    },

    gstNumber:{
        type:String,
        trim:true,
        default:"",
    },

    bankAccount:{
        type:String,
        required:true,
        trim:true,
    },

    ifscCode:{
        type:String,
        required:true,
        trim:true,
        uppercase:true,
    },
    
    refreshToken:{
        
        type:String,

    },


},{timestamps:true});

//pre function() for hashing password just before from save the data into database
adminSignupSchema.pre('save',async function (next)
{
   
    if(!this.isModified('password'))
    {
        return next();
    }
    
try{
        const salt= await bcrypt.genSalt(10);

    this.password=await bcrypt.hash(this.password,salt);

    next();
}

catch(err)
{
    next(err);
}
    

})



adminSignupSchema.virtual("totalQuantity").get(function()
{
    return 0;


});



export const Admin= mongoose.model('signupadmin',adminSignupSchema);
