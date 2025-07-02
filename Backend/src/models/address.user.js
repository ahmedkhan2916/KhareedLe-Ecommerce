import mongoose, { Schema } from "mongoose";

const address_Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'signupuser', required: true },
    type: { type: String, enum: ["billing", "shipping"], required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    pincode: { type: String, required: true },
    locality: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    landmark: { type: String, required: true },
    alternate: { type: String, required: true },
      latitude: { type: Number, required: false },   // optional — add only if map is used
  longitude: { type: Number, required: false },
}, { timestamps: true });

const address_user = mongoose.model('Address', address_Schema);

export default address_user;
