import mongoose from "mongoose";
import { Schema } from "mongoose";


const OrderSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['ordered', 'cancelled', 'delivered', 'returned','pending'],
    default: 'pending'
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  deliveryDate: {
    type: Date
  },
  returnDate: {
    type: Date
  },
  returnReason: {
    type: String
  },
  cancelReason: {
    type: String
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending', 'failed'],
    default: 'paid'
  },
  payAt:{
    type:Date,
    default:null
},
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  }
});


//generating OrderId randomly using date and math.random mathod
OrderSchema.pre("save",async function (next){

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