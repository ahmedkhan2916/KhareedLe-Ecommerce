// Importing mongoose
import mongoose,{Schema} from "mongoose";


const ProductInsightsSchema = new Schema({

    productId: { type: mongoose.Schema.Types.ObjectId, ref: "productdetail", required: true, unique: true, index: true }, // Unique product ID
    product_image: { type: String, required: true }, // Product Image
    product_name: { type: String, required: true }, // Product Name
    searchCount: { type: Number, default: 0 }, // Most Searched Items
    bagCount: { type: Number, default: 0 } // Most Bought Items
});


export const ProductInsights=mongoose.model("ProductInsight",ProductInsightsSchema);

