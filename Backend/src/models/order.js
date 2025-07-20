import mongoose from "mongoose";
const { Schema } = mongoose;



const OrderSchema = new Schema({
  
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

   products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productdetail",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],

  totalPrice:{ 
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ['ordered', 'cancelled', 'delivered', 'returned', 'pending'],
    default: 'pending'
  },

  orderDate: {
    type: Date,
    default: Date.now
  },

  deliveryDate: Date,

  returnDate: Date,

  returnReason: String,

  cancelReason: String,

  paymentStatus: {
    type: String,
    enum: ['paid', 'pending', 'failed'],
    default: 'paid'
  },

  payAt: {
    type: Date,
    default: null
  },

  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },

  orderID: {
    type: String,
    unique: true
  }
});

// Auto-generate orderID
OrderSchema.pre("save", async function (next) {
  if (!this.orderID) {
    const currentDate = new Date();
    const datePart = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`;
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    this.orderID = `ORD-${datePart}-${randomPart}`;
  }
  next();
});

export const OrderUser = mongoose.model("Order", OrderSchema);
