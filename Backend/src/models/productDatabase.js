import  mongoose,{ Schema } from "mongoose"

const ProductDetails=new Schema({

    category:{
        
        type:String,
        require:true,

    },

    company_name:{

        type:String,
        require:true,

    },

    product_name:{

        type:String,
        require:true,

    },

    mrp:{

        type:Number,
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

sku:{

    type:String,

},


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

      },

      quantity: {
  type: Number,
  required: true,
  default: 0,
  },

  inStock: {
  type: Boolean,
  default: true,
},


},{ timestamps : true });


export const ProductD=mongoose.model("productdetail",ProductDetails);