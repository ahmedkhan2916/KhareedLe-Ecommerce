import mongoose from "mongoose"
import { Schema } from "mongoose"



const paymentSchema=new Schema({

    paymentId:{

        type:String,
        unique:true,
        required:true,

    },

    userId:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'signupuser',
        required:true
    },

    orderId:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"order",
        required:true,

    },

    method: {
        type: String,
        enum: ['UPI', 'Card', 'NetBanking', 'Wallet'], // Add supported methods
        required: true,
      },

      transactionID: {
        type: String,
        required: true,
      },

      amount: {
        type: Number,
        required: true,
      },

      status: {
        type: String,
        enum: ['Success', 'Failure', 'Pending'],
        default: 'Pending',
      },

      gatewayResponse: {
        type: Object, // Store metadata from the payment gateway
        default: {},
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },

});

export  const UserPayment=mongoose.model("payment",paymentSchema);