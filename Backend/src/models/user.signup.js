// import { application } from "express";
import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"

    const userSignupSchema = new Schema({

    firstname:String,

    lastname:String,

    // phone:String,

    username:{

    type:String,
    required:true,
    unique:true,
    trim:true,
    index:true,

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

    refreshToken:{
        type:String,

    }

},{timestamps:true});

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