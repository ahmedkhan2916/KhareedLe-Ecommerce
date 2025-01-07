import { Schema } from "mongoose";
import mongoose from "mongoose";




const userReview=mongoose.Schema({

    rating:{type:String,min:1,max:5,required:true},

    comment:{type:String,required:true},

    userId:{type:mongoose.Schema.Types.ObjectId,ref:'signupuser',required:true},

    productId:{type:mongoose.Schema.Types.ObjectId,ref:'productdetail',required:true},

    imgUrl: [{
        type: String,  // URL to the uploaded image (Cloudinary, S3, etc.)
        required: false
      }],

    submittedAt:{type:Date,default:Date.now},

});

const review=mongoose.model('userreview',userReview);

export default review;