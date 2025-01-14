import { json } from "express";
import jwt from "jsonwebtoken"
import { User } from "../models/user.signup.js";
import { ProductD } from "../models/productDatabase.js";
import address_user from "../models/address.user.js";
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import {Router} from "express";
import review from "../models/user.review.js";
import dialogflow from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';  // Correct import


const router=Router();


// dotenv.config({path:"../.env"});

const generateAccessToken=(user)=>{
  
return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});


}


const generateRefreshToken=(user)=>{
  
  return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"});
  
  }

const SignUp=async (req,res) =>
  {

    const {firstname,lastname,phone,username,password,email} = req.body;

    if([firstname,lastname,phone,username,password,email].some((field)=> field?.trim()===""))

        {
            return res.send("Error in Signup Fill the Data Correctly..!");
        }

      console.log(req.body);

      const user=await User.create({

        firstname,
        lastname,
        email,
        phone,
        username,
        password,

      });

     const createdUser=await User.findById(user._id).select("-password");

     if(!createdUser)
     {

    
      res.send("Error in Database..!!!!");

     }



      res.json({firstname:firstname,lastname:lastname,email:email,contact:phone,username:username,password:password});

}

// import bcrypt from 'bcrypt';
// import { generateAccessToken, generateRefreshToken } from './tokenUtils.js';
// import User from '../models/User.js'; // Adjust the path based on your folder structure

const Login = async (req, res) => {
  const { email, password } = req.body;

  // Check if all fields are filled
  if ([ email, password].some(str => !str || str.trim() === '')) {
    return res.status(402).send("Error: Please fill all fields correctly.");
  }

  try {
    // Check if user exists
    const userCheck = await User.findOne({ $or: [{ email }] });
    if (!userCheck) {
      return res.status(404).send("This User does not exist.");
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, userCheck.password);
    if (!isMatch) {
      return res.status(406).send("Password does not match.");
    }

    // Generate tokens
    const accessToken = generateAccessToken({ Id: userCheck._id });
    const refreshToken = generateRefreshToken({ Id: userCheck._id });

    // Save refreshToken in the database
    userCheck.refreshToken = refreshToken;
    await userCheck.save({ validateBeforeSave: false });


    // Return the tokens
    return res.status(200).json({ accessToken, refreshToken,user:{  //Status Pending send tokens via cookies in http-only

      id:userCheck._id,
      name:userCheck.firstname,
      email:userCheck.email,
      status:true
      


    } });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("Server error.");
  }
};

const UploadPost=async (req,res)=>{

  const {company_name,product_name,price,product_details,product_image,rating,description}=req.body;

  const user=await ProductD.create({

    company_name,
    product_name,
    price,
    product_details,
    product_image,
    rating,
    description,

  });

  
  const uploaduser= await ProductD.findById(user._id);

  if(!uploaduser)
  {

    return res.send("database Error..!!!");

  }

 return res.send("Data Successfully Stored..!!!");



}

const getData=async (req,res)=>{


  const data=await ProductD.find();

  if(!data)
  {
   return res.send("no data found sorry...!!!");
  }

  return res.json(data);

}

const sendDataById=async(req,res)=>{


const {payload} = req.body;


console.log("this is my payload",payload);


 const userProduct=await ProductD.findById(payload);

 if(!userProduct)
 {


  return res.sendStatus(400).json({"data":"Sorry data not Found..>!!!"});

 }

return res.json(userProduct);

}


const update=async(req,res)=>{

  const priceSimi=req.query.value
  const convertPrice=Number(priceSimi);
 

  

  try{

    const result = await ProductD.find(
{
  price:{$lt:convertPrice},//$lt use to find minimum value in comparison of price you entered in curly braces
}




    );

   return res.json(result);

  }catch(error)
  {
    return res.send("sorry no product is available on minimum price..!!");

  }

}


const user_review=async(req,res)=>{

  const {userId,productId,rating,comment,imgUrl}=req.body;

  // if(!rating || !comment)
  // {

  //   return res.sendStatus(402).json({err:"bad request"});


  // }

try{
  
   const userReview=new review({

    userId,
    productId,
    rating:Number(rating),
    comment,
    imgUrl

   });

   await userReview.save();

   return res.status(200).json({message:"review submitted succefully",review:userReview});

  }
  
  catch(err)

  {

    return res.sendStatus(404);

  }
}

const fetch_userReviews = async(req,res)=>{


const userReview = await review.find({}).populate( 'userId' , 'firstname' );


console.log("this is user review",userReview);

if(!userReview)
{

  return res.send("something error!!");


}

res.json({message:"successfuly sent",data:userReview});

}


const userSearch=async(req,res)=>{


  const {name}=req.query;

  
  

  // const searchedData=await ProductD.find({company_name : { $regex:name, $options:
  //   'i' }});
    const searchedData=await ProductD.find({company_name : { $regex:name, $options:
         'i' }},{product_name :1, _id: 1 });

         console.log(searchedData);

  if(searchedData.length==0)
  {
    
  // const searchDataByMobileName=await ProductD.find({product_name : { $regex:name, $options:
  //   'i' }});
  


    const searchDataByMobileName=await ProductD.find({product_name : { $regex:name, $options:
         'i' }},{product_name :1,
      _id:1});

    console.log(searchDataByMobileName.length);

    if(searchDataByMobileName.length==0)
    {
    
      return res.json([]);
    }

    return res.json({'searchedItems':searchDataByMobileName});

  }

  return res.json({'searchedItems':searchedData});

}

const updateProductImage=async (req,res)=>{

  try{

    const product= await ProductD.findById('66cb21b65ded4d82f9def49d');

    if(product)
    {

      product.product_color=[

        {
          color:"Black",

          image_urls:[

           "https://cdn.mos.cms.futurecdn.net/Muee5w7KsWfAnLoKsxdq7H.jpg",

           "https://i.guim.co.uk/img/media/57828dad13e775fd65c7880d8e3be52c0414236d/54_344_5310_3187/master/5310.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=c720e0c8779a1ef3ad2d16aa95dc3a06",

           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoGsEmd6L6OGBMTYBuBkuHHR0b_RVP8HHhLQ&s",



          ],
        },


        {
          color:"Blue",

          image_urls:[

            "https://m.media-amazon.com/images/I/717JX3femML.jpg",

            "https://i.gadgets360cdn.com/large/oneplus-12r-review-main_1707301603723.jpg",

            "https://www.techadvisor.com/wp-content/uploads/2024/02/OnePlus-12_review_5-1.jpg?quality=50&strip=all&w=1024"


          ]

        },

        {
          color:"Green",

          image_urls:[

            "https://static.toiimg.com/thumb/imgsize-20024,msid-107097549/107097549.jpg?width=500&resizemode=4",

            "https://preview.redd.it/heres-our-first-official-look-at-the-oneplus-12-green-with-v0-7jvd16uuaq2c1.jpg?auto=webp&s=2292e6283fccd66530b354c49c2e6e1381116bbf",

            "https://www.zdnet.com/a/img/resize/fc45f89aa6281581ff599f33926680abb3dae2ab/2024/01/23/4f0b7ed8-dee6-47c4-8b08-72f2cbe0efa3/dsc01057.jpg?auto=webp&fit=crop&height=1200&width=1200"


          ]

        }

      ]

    }

    await product.save();
    console.log("successfully updated");
    res.send("success")

  }

  catch(err)
  {

    console.log(err);
    res.send("error")


  }



}



const chatbotResponse=async(req,res)=>{

  const queryText = req.body.message;
  console.log(queryText);
  // * Send a query to the Dialogflow agent, and return the query result.
  // * @param {string} projectId The project to be used
  // * @param {string} queryText The query text from the frontend
  // * @param {object} res The Express response object
  // A unique identifier for the given session
  
   const sessionId = uuidv4();  // Correct usage of uuid
 
   // Create a new session
   const sessionClient = new dialogflow.SessionsClient({
     keyFilename: 'C:/Users/Amreen/Downloads/newagent-ttok-fcb97b5e19ab.json',
   });
 
   const sessionPath = sessionClient.projectAgentSessionPath('newagent-ttok', sessionId);
 
   // The text query request
   const request = {
     session: sessionPath,
     queryInput: {
       text: {
         text: queryText,  // Use queryText received from the frontend
         languageCode: 'en-US',
       },
      
     },
   };
 
   // Send request and log result
   const responses = await sessionClient.detectIntent(request);
   console.log('Detected intent');
   const result = responses[0].queryResult;
   console.log(`  Query: ${result.queryText}`);
   console.log(`  Response: ${result.fulfillmentText}`);
 
   // Send the result back to the frontend


   console.log(result.queryText, "Received from Dialogflow");
   // Send response back to the frontend
   res.json({
     query: result.queryText,
     response: result.fulfillmentText,
   });

  //  response_Result(result, res);
 
   if (result.intent) {
     console.log(`  Intent: ${result.intent.displayName}`);
   } else {
     console.log('  No intent matched.');
   }
 }



 const addCountItems=async(req,res)=>{

  const {userId,productId} = req.body;
  console.log("this is userId",userId);

  // if(userId.length>0 && productId.length<=0)
  // {
  //   const user = await User.findById(userId);
  // }
  // console.log("ServerSide",userId,productId);

   const user = await User.findById(userId);
   const recieve=user.bag.findIndex((item) => item.productId?.toString() === productId?.toString());
   console.log("yes this is hrer",recieve);

  if( recieve>-1 )
  {
    console.log("yes you inside this function");

  return  res.status(200).json({"bag":user.bag});

    // return res.json({"Message":"Product already Exist in Bag...!!"});
  }

  else{
  user.bag.push({productId,quantity:1});
  await user.save();
  return res.status(201).json({"bag":user.bag});

  }

  // const productIndex= user.bag.findIndex((item)=>item.productId.toString()===productId.toString());
  // console.log(productIndex);
  // if(productIndex>-1)
  // {
  //   user.bag[productIndex].quantity+=1;
  // }
  // else{
  //   user.bag.push({productId,quantity:1});
  // }
//  await user.save();
//  res.json({'bag':user.bag});



 }


 const deleteCountItems = async (req, res) => {
  try {
      const { userId, productId } = req.body;

      if (!userId || !productId) {
          return res.status(400).json({ error: "User ID and Product ID are required." });
      }

      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ error: "User not found." });
      }

      const productIndex = user.bag.findIndex(
          (item) => item.productId && item.productId.toString() === productId.toString()
      );

      if (productIndex > -1) {
          user.bag[productIndex].quantity -= 1;

          // Remove item if quantity reaches 0
          if (user.bag[productIndex].quantity <= 0) {
              console.log(`Removing product ${productId} from cart as quantity is zero.`);
              user.bag.splice(productIndex, 1);
          } else {
              console.log(`Decrementing quantity of product ${productId}. New quantity: ${user.bag[productIndex].quantity}`);
          }

          await user.save();
          return res.status(200).json({ bag: user.bag });
      } else {
          console.warn(`Product ${productId} not found in the cart for user ${userId}.`);
          return res.status(404).json({ message: "Product not found in the cart." });
      }
  } catch (error) {
      console.error("Error in deleteCountItems:", error);
      return res.status(500).json({ error: "Internal server error." });
  }
};


 const showTotalItemsCount=async (req,res)=>{


  const {userId}=req.body;

  console.log("here is your id of user",userId);
  const user = await User.findById(userId);

  if(!user)

  {

    return res.status(404).send("user not found baby...!");

  }

  let totalQuantity = user.bag.reduce((total, item) => total + item.quantity, 0);
  console.log("yes here is your data",totalQuantity);
  totalQuantity=totalQuantity;
  res.json({totalQuantity});


 }

 const fetchBagItems = async (req, res) => {
    const { userIdStorage } = req.body;

    console.log("userId:", userIdStorage);

  
    try {
        const user = await User.findById(userIdStorage).populate('bag.productId');
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        // Extract product details safely
        const bagItems = user.bag.map(item => {
            if (!item.productId) {
                console.warn("Invalid productId in bag item:", item);
                return null;
            }

            return {
                productName: item.productId.product_name,
                quantity: item.quantity,
                price: item.productId.price,
                productImage: item.productId.product_image,
                productId: item.productId._id
            };
        }).filter(item => item !== null); // Remove invalid entries

        if (!bagItems.length) {
            return res.status(404).json({ message: "No valid products found in the bag." });
        }

        res.json({ bagItems });
    } catch (err) {
        console.error("Error fetching user data:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

 const address=async(req,res)=>{

  
 const {userId,name,type,phone,pincode,locality,street,city,state,landmark,alternate}=req.body;

 console.log("this is data",req.body);
  if(!userId || !name || !street || !phone || !city || !state || !pincode || !landmark || !alternate)
  {

   return res.json({"error":"please fill the data correctly...!"});

  }


 const address_Instance= new address_user({

   userId,
   name,
   type,
   street,
   phone,
   city,
   state,
   pincode,
   landmark,
   locality,
   alternate,




 })

 

 const idAddress=await address_Instance.save();

 console.log(idAddress._id);

 const userAddressSave=await User.findByIdAndUpdate(userId,{$push:{addresses:idAddress._id}},{new:true});
 
 console.log("new address saved",userAddressSave);
 if(!userAddressSave)
 {
  return res.json({"error":"address id not saved in userSchema"});
 }

 return res.json({"SuccessI":"address id added succesfully","SuccessII":"Address added succesfully","array":address_Instance});
}


const changeText=async(req,res)=>{

  const {userId,productId}=req.body;

  try{
    if(!userId)
      {

        return res.status(404).json({"error":"user not found"});    

      }

      const user = await User.findById(userId);
      const recieve=user.bag.findIndex((item) => item.productId?.toString() === productId?.toString());
      console.log("yes this is hrer",recieve);

     if( recieve>-1 )
     {

       console.log("yes you inside this function");
   
       return res.status(200).json({"bag":user.bag});
       
       // return res.json({"Message":"Product already Exist in Bag...!!"});

     }
     else{

return res.status(201).json({"Exist":"product is not Exist in Bag"});

     }


  } catch(err){

    res.send(400).json({"error":"something went wrong"});

  }

}


const totalItemsPrice = async (req, res) => {
  try {
    const { userId } = req.body;
    
    const user=await User.findById(userId).populate({

      path:"bag.productId",
      select:"price",

    });

    if(!user)
    {
      return res.status(401).json({"error":"UserId Not Found"});
    }

    const totalBag=user.bag.reduce((total,item)=>{

      const price=item.productId?.price || 0;
      
      return total+price * item.quantity;

    },0);


  return res.status(200).json({"Price":totalBag});


  }catch(err)
  {
    return res.status(402).json({"error":"Something Error"});
  }



};




export {SignUp,Login,UploadPost,getData,sendDataById,update,user_review,fetch_userReviews,userSearch,updateProductImage,chatbotResponse,addCountItems,showTotalItemsCount,fetchBagItems,deleteCountItems,address,changeText,totalItemsPrice};
