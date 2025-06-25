import mongoose, { Schema } from "mongoose";


const GiftSchema = new Schema({

name:{type:String,required:true,unique:true},
quantity:{type:Number,required:true},
imageUrl:String,
active:{type:Boolean,default:true},

},{timestamps:true});


export const Gift_Schema= mongoose.model("Gift",GiftSchema);