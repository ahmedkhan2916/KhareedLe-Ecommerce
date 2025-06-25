import mongoose, { Schema } from "mongoose";

const Gift_User_Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'signupuser', required: true },
    giftId: { type: mongoose.Schema.Types.ObjectId, ref: 'gift', required: true },
    redeemed: { type: Boolean, default: false },
    redeemedAt: { type: Date, default: Date.now },
}, { timestamps: true });


// Create a model using the schema

export const Gift_Store_DB = mongoose.model('GiftRedeem', Gift_User_Schema);