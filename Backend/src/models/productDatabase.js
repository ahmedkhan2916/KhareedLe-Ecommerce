import  mongoose,{ Schema } from "mongoose"

const ProductDetails=new Schema({

    company_name:{
        type:String,
        require:true,
    },

    product_name:{
        type:String,
        require:true,
    },

    price:{

        type:Number,
        require:true,
        
    },

    product_details:{

        type:String,
        require:true,
    },

    product_image:{
        type:String,
        require:true,
    },

    product_color:[
{
    
    color:{type:String,required:true},

    image_urls:[
        
        {type:String},

    ]
}],

//  isTrending: {
//     type: Boolean,
//     default: false,
//   },

//   trendingCategory: {
//     type: String,
//     enum: ['Hot Right Now', 'Best Offers', 'Just Launched', 'None'],
//     default: 'None',
//   },


    rating: {
        type: Number,
        default: 0, // Default value if not provided
      },

      description:{

        type:String,

      }

},{ timestamps : true });


export const ProductD=mongoose.model("productdetail",ProductDetails);