import mongoose from "mongoose";
import { Schema } from "mongoose";

const OrderSchema=new Schema({

        orderID:{

            type:String,
            unique:true,
            required:true,


        },

        userId:{

            type:mongoose.Schema.Types.ObjectId,
            ref:'signupuser',
            required:true
        },
        products:[
     {
     
        productId:{

            type:mongoose.Schema.Types.ObjectId,
            ref:"productdetail",
            required:true,
        },

        quantity:{

            type:Number,
            required:true,

        }


    }
    ],

    totalAmount:{

        type:Number,
        required:true,

    },

    paymentId:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"payment",
        required:true,
    
    },

    orderStatus:{

        type:String,
        enum:["processing","shipped","delivered",'cancelled'],
        default:"processing"

    },
    createdAt:{

        type:Date,
        default:Date.now,


    }
});


//generating OrderId randomly using date and math.random mathod
OrderSchema.pre("save",async (next)=>{

    if(!this.orderID)
    {

        const currentDate=new Date();

        const datePart=`${currentDate.getFullYear()} ${(currentDate.getMonth()+1).toString().padStart(2,'0')} ${currentDate.getDate().toString().padStart(2,'0')}`

        const randomPart=Math.floor(1000+Math.random()*9000);

        this.orderID=`ORD-${datePart}-${randomPart}`;
    }

    next();
    
});



export const OrderUser= mongoose.model("Order",OrderSchema);