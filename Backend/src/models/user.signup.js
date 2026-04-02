// import { application } from "express";
import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"

    const userSignupSchema = new Schema({

    firstname:String,

    lastname:String,

    // phone:String,

    phonenumber:String,

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

    // 🔐 FRAUD & TRUST SYSTEM
trustScore: {
    type: Number,
    default: 100
},

totalOrders: {
    type: Number,
    default: 0
},

totalReturns: {
    type: Number,
    default: 0
},

failedDeliveries: {
    type: Number,
    default: 0
},

codOrders: {
    type: Number,
    default: 0
},

prepaidOrders: {
    type: Number,
    default: 0
},

// 🚨 CONTROL FLAGS
isBlocked: {
    type: Boolean,
    default: false
},

isCODAllowed: {
    type: Boolean,
    default: true
},

isReturnAllowed: {
    type: Boolean,
    default: true
},

// 🕵️ SECURITY TRACKING
ipHistory: {
    type: [String],
    default: [],
},
deviceHistory: {
    type: [String],
    default: [],
},
    
    bag:[

{
    productId:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'productdetail',

    },

    quantity:{

        type:Number,
        default:0,
    },

    addedAt:{

        type:Date,
        default:Date.now,

    }

}



    ],

    addresses:
    [{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Address"
    }],

    role:{

        type:String,
        enum:["user","admin","seller"],
        default:"user",


    },

    isApproved:{

        type:Boolean,
        default:false,

    },
    

    refreshToken:{
        type:String,

    }

},{timestamps:true});


userSignupSchema.index({ trustScore: 1 });

//pre function() for hashing password just before from save the data into database
userSignupSchema.pre('save',async function (next)
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



userSignupSchema.virtual("totalQuantity").get(function()
{


    return this.bag.reduce((total,item)=>total+item.quantity,0);


});



export const User= mongoose.model('signupuser',userSignupSchema);
