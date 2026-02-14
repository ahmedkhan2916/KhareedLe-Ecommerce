import { json } from "express";
import jwt from "jsonwebtoken"
import { User } from "../models/user.signup.js";
import { ProductD } from "../models/productDatabase.js";
import {ProductInsights} from "../models/ProductInsightsSchema.js"
import address_user from "../models/address.user.js";
import {OrderUser} from "../models/order.js";
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import {Router} from "express";
import review from "../models/user.review.js";
import dialogflow from '@google-cloud/dialogflow';
import classErrorHandling from "../middlewares/classErrorHandle.js";
import {Gift_Store_DB} from "../models/Gifts.user.redeem.js";
import {Gift_Schema} from "../models/Gifts.Quantity.js";
import crypto from "crypto"
import { v4 as uuidv4 } from 'uuid';  // Correct import
import Razorpay from "razorpay";
import axios from "axios";
import { Admin } from "../models/admin.signup.js";

const router=Router();


// dotenv.config({path:"../.env"});




const generateAccessToken=(user)=>{
  
return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1d"});


}

//encrypt function encrypting IDS here:- 


const algorithm = 'aes-256-cbc';

if (!process.env.ENCRYPTION_KEY) {
  throw new Error("ENCRYPTION_KEY is missing from environment variables");
}
const secretKey =  Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
// Must be 32 bytes for aes-256
const iv = crypto.randomBytes(16); // Initialization vector

function encryptIDS(ID) {
  const cipher = crypto.createCipheriv(algorithm, secretKey , iv);
  let encrypted = cipher.update(ID, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Return iv + encrypted text (you'll need the iv for decryption later)
  return iv.toString('hex') + ':' + encrypted;
}

//dcrypt function dcrypting IDS here:- 
function decryptIDS(encryptedString) {
  const [ivHex, encryptedData] = encryptedString.split(':'); // Extract IV and encrypted text
  const iv = Buffer.from(ivHex, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}


const generateRefreshToken=(user)=>{
  
  return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"});
  
  }

  const SignUp = async (req, res) => {

    const { firstname, lastname, phonenumber, password, email } = req.body;
  
    // Validate input fields

    console.log(firstname,lastname,phonenumber,password,email);

    if ([firstname, lastname,phonenumber, password, email].some(field => !field || field.trim() === "")) {
      return res.status(400).json({ error: "All fields are required." });
    }
 
    try {
      // Check for existing user
      console.log("im here");
      const existingUser = await User.findOne({ email });

      console.log("user created....",existingUser)

      if (existingUser) {

        return res.status(409).json({ error: "Email already registered." });

      }
  
      // Hash the password
      // const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user
      const user = await User.create({
        firstname,
        lastname,
        phonenumber,
        password,
        email,
      });

      console.log("user created....",user)
  
      const createdUser = await User.findById(user._id).select("-password");
      if (!createdUser) {
        return res.status(500).json({ error: "Error saving user data." });
      }

      res.status(201).json({
        message: "Signup successful!",
        user: { firstname, lastname, email,phonenumber,password },
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };



  
  const SignUpAdmin = async (req, res) => {

    const { firstname, lastname, phonenumber, password, email } = req.body;
  
    // Validate input fields

    console.log(firstname,lastname,phonenumber,password,email);

  if (
  !firstname?.trim() ||
  !lastname?.trim() ||
  !email?.trim() ||
  !password?.trim() ||
  !phonenumber
) {
  return res.status(400).json({ error: "All fields are required." });
}

 
    try {
      // Check for existing user
      console.log("im here");
      const existingUser = await Admin.findOne({ email });

      console.log("user created....",existingUser)

      if (existingUser) {

        return res.status(409).json({ error: "Email already registered." });

      }
  
      // Hash the password
      // const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user
      const user = await Admin.create({
        firstname,
        lastname,
        phonenumber,
        password,
        email,
      });

      console.log("user created....",user)
  
      const createdUser = await Admin.findById(user._id).select("-password");
      if (!createdUser) {
        return res.status(500).json({ error: "Error saving user data." });
      }

      res.status(201).json({
        message: "Signup successful!",
        user: { firstname, lastname, email,phonenumber,password },
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };



  const LoginAdmin= async (req, res, next) => {
  const { EMAILORPHONENO, password } = req.body;

  // Separate into email or phone number
  let email = "";
  let phonenumber = "";

  if (EMAILORPHONENO) {
    // If it contains only digits, treat as phone number
    if (/^\d+$/.test(EMAILORPHONENO)) {
      phonenumber = EMAILORPHONENO;
    } else {
      email = EMAILORPHONENO;
    }
  }

  // Validate presence
 if (!EMAILORPHONENO || !password) {
  return res.status(400).json({ error: "Email or phone and password are required." });
}


  if ([EMAILORPHONENO, password].some(field => !field || field.trim() === "")) {
    return res.status(400).json({
      error: "Email or Phone Number and password are required."
    });
  }

  try {
    // Find user based on email or phone
   let query = {};

if (email) query.email = email;// insert email in query array

if (phonenumber) query.phonenumber = phonenumber; // insert phone number in query array

const user = await Admin.findOne(query); // send query here

   if (!user) {
  throw new classErrorHandling("User Not Found", 404); // Or 401
}

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // Encrypt user ID
    const ID = user._id.toString();
    const encrypt = encryptIDS(ID);

    // Generate tokens
    const accessToken = generateAccessToken({ id: encrypt });
    const refreshToken = generateRefreshToken({ id: encrypt });

    // Store refresh token in DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Set cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Success response
    res.status(200).json({
      message: "Login successful!",
      accessToken,
      user: {
        id: encrypt,
        name: user.firstname,
      },
    });

  } catch (error) {
    next(error);
  }
};





// import bcrypt from 'bcrypt';
// import { generateAccessToken, generateRefreshToken } from './tokenUtils.js';
// import User from '../models/User.js'; // Adjust the path based on your folder structure

const Login = async (req, res, next) => {
  const { EMAILORPHONENO, password } = req.body;

  // Separate into email or phone number
  let email = "";
  let phonenumber = "";

  if (EMAILORPHONENO) {
    // If it contains only digits, treat as phone number
    if (/^\d+$/.test(EMAILORPHONENO)) {
      phonenumber = EMAILORPHONENO;
    } else {
      email = EMAILORPHONENO;
    }
  }

  // Validate presence
 if (!EMAILORPHONENO || !password) {
  return res.status(400).json({ error: "Email or phone and password are required." });
}


  if ([EMAILORPHONENO, password].some(field => !field || field.trim() === "")) {
    return res.status(400).json({
      error: "Email or Phone Number and password are required."
    });
  }

  try {
    // Find user based on email or phone
   let query = {};

if (email) query.email = email;// insert email in query array

if (phonenumber) query.phonenumber = phonenumber; // insert phone number in query array

const user = await User.findOne(query); // send query here

   if (!user) {
  throw new classErrorHandling("User Not Found", 404); // Or 401
}

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // Encrypt user ID
    const ID = user._id.toString();
    const encrypt = encryptIDS(ID);

    // Generate tokens
    const accessToken = generateAccessToken({ id: encrypt });
    const refreshToken = generateRefreshToken({ id: encrypt });

    // Store refresh token in DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Set cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Success response
    res.status(200).json({
      message: "Login successful!",
      accessToken,
      user: {
        id: encrypt,
        name: user.firstname,
      },
    });

  } catch (error) {
    next(error);
  }
};



const Logout = async(req, res) => {

 

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true, // ✅ Important on Render/Vercel (HTTPS)
  sameSite: 'none', // ✅    // must match
    path: "/",           // default path; add explicitly to be safe
  });

  res.clearCookie("accessToken", {
  httpOnly: true,
    secure: true, // ✅ Important on Render/Vercel (HTTPS)
  sameSite: 'none', // ✅// true in production with HTTPS
});

  return res.status(200).json({ message: "Logged out successfully" });
};




const handleUserIDFetch=(req,res)=>{

  try {

    const userId = req.user.id; // Extract userID from the token payload
    console.log("here is my payload",userId);
    if(!userId)
    {
      return;
    }
    
    const ID=decryptIDS(userId)
    console.log("here is my payload",ID);
    res.status(200).json({ ID });

  } catch (error) {
    next(error)
  }

}


const refreshTokenHandler = async (req, res) => {

  try {
    const { encryptId } = req.body;

    console.log("iiiiiidddddddddddddddddddddddd",encryptId);

    if (!encryptId) {
      return res.status(400).json({ error: "Missing required ID in the request." });
    }

    const refreshToken = req.cookies.refreshToken; // Retrieve token from HTTP-only cookie

     console.log("hello this is Refreshhh Tokennnnnnnnnn",refreshToken);
    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token missing. Please log in again." });
    }
   console.log("refreshToken is hereeeeeeeeeeeeeee",refreshToken);
    // Verify the refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(403).json({ error: "Refresh token expired. Please log in again." });
        }
        return res.status(403).json({ error: "Invalid refresh token." });
      }

      const userId = decryptIDS(encryptId); // Decrypt the user ID
      if (!userId) {
        return res.status(403).json({ error: "Invalid ID provided." });
      }

      // Fetch the user and validate the stored refresh token
      const user = await User.findById(userId);
      if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).json({ error: "Invalid or tampered refresh token." });
      }

      // Generate a new access token
      const newAccessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });

      // Optionally, rotate the refresh token for better security
      // const newRefreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
      // user.refreshToken = newRefreshToken;
      // await user.save();

      res.status(200).json({
        message: "Token refreshed successfully.",
        accessToken: newAccessToken,
        // Uncomment if using token rotation
        // refreshToken: newRefreshToken,
      });
    });
  } catch (error) {
    console.error("Error in refresh token handler:", error.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};


const Only_refresh_Token_Access_Token_Handler = async (req, res) => {


  try {
    console.log("hello baby");
    const refreshToken = req.cookies.refreshToken;

    console.log("cookies coming>>>>>>hurrrayyyy",refreshToken);

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token missing. Please log in again." });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(403).json({ error: "Refresh token expired. Please log in again." });
        }
        return res.status(403).json({ error: "Invalid refresh token." });
      }
      
      const userId = decoded.id;

      const newAccessToken = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });

      console.log("it is my new accessToken here",newAccessToken)

      return res.status(200).json({
        message: "Token refreshed successfully.",
        accessToken: newAccessToken,
      
      });

    });
  } catch (error) {
    console.error("Error in refresh token handler:", error.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const testManuallyCookies=async(req,res)=>{


    console.log("🍪 cookies in test route:", req.cookies);
  res.json({ cookies: req.cookies });



}





const UploadPost= async(req,res) => {

  const {category,company_name,product_name,price,product_details,product_image,rating,description,quantity,inStock,mrp,sku}=req.body;

  const user=await ProductD.create({

    category,
    company_name,
    product_name,
    price,
    product_details,
    product_image,
    rating,
    description,
    quantity,
    inStock,
    sku,
    mrp,


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
console.log("this is dataProduct",data);
  return res.json(data);

}

const getDataByItemCategory=async(req,res)=>{

  const {category_item}=req.query;

  console.log("here is my dataaaaaa category",category_item);

  const data=await ProductD.find({category:category_item});

   if (!data || data.length === 0) {
    return res.status(404).send("no data found sorry...!!!");
  }
console.log("this is dataProduct",data);
  return res.json(data);

}   //backend has ready tommorow component i will create...!!

const sendDataById=async(req,res)=>{


const {payload} = req.body;


console.log("this is my payload",payload);

 const userProduct=await ProductD.findById(payload);

 console.log("hello world.....",userProduct);
 if(!userProduct)
 {


  return res.sendStatus(400).json({"data":"Sorry data not Found..>!!!"});

 }
 
 console.log("this is userProduct ID",userProduct._id);

 

 res.cookie("productID",userProduct._id.toString(),{
  httpOnly: true,
  secure: true, // ✅ Important on Render/Vercel (HTTPS)
  sameSite: 'none', // ✅ Must be 'none' for cross-site cookies
 
  maxAge: 7 * 24 * 60 * 60 * 1000, // 1 day
})
return res.json(userProduct);  //productID coming here fix here store productId in cookies..!!

}

const getProductIdFromCookies = async (req, res) => {

  try {
    console.log("Cookies in Backend:", req.cookies);
    const productID = req.cookies.productID; // Read productID from cookies
    console.log("hello i am hereeeee babyyyy",productID);
    if (!productID) {
      return res.status(400).json({ message: "No productID found in cookies" });
    }

    console.log("Retrieved Product ID from Cookies:", productID);
    
    return res.json({ productID }); // Send the productID back to the frontend

  } catch (error) {
    console.error("Error retrieving product ID:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};





const update=async(req,res)=>{

  const priceSimi=req.query.value
  console.log("this is similiar data in backend",priceSimi);
  const convertPrice=Number(priceSimi);
 

  

  try{

    const result = await ProductD.find(
{
  price:{$lt:convertPrice},//$lt use to find minimum value in comparison of price you entered in curly braces
}




    );
  console.log("this is my result in similiar data",result)
   return res.json(result);

  }
  catch(error)
  { 
    return res.send("sorry no product is available on minimum price..!!");

  }

}

//update smartphone prices
const updatePricesSP=async(req,res)=>{

const {PID}=req.body;

if(!PID || !mongoose.Types.ObjectId.isValid(PID))
{
  return res.status(402).json({"error":"ID NOT COMING INTO BODY"});
}

try{
  
  const result=await ProductD.findByIdAndUpdate(PID,{$set:{price:60000}},{new:true});
  console.log("this is update prices",result);
if(!result)
{
  return res.status(401).json({"error":"ID NOT FOUND SORRY"});
}

return res.status(200).json({"Success":"Data Updated Successfully"});

}
catch(error)
{
  return res.status(402).json({"error":"Something Error"});
}

}



const user_review=async(req,res)=>{

  const {userId,productId,rating,comment,imgUrl}=req.body;

  if(!rating || !comment)
  {

    return res.sendStatus(402);

  }

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

    const product= await ProductD.findById('69837e00131d969894673482');

    if(product)
    {

      product.product_color=[

        {
          color:"Orange",

          image_urls:[

            "https://www.designinfo.in/wp-content/uploads/2025/09/Apple-iPhone-17-Pro.webp",

           "https://photos5.appleinsider.com/gallery/65450-136950-65239-136382-IMG_3643-xl-xl.jpg",

           "https://substackcdn.com/image/fetch/$s_!s4E9!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb85847f6-b5fc-4c87-9981-483ea60df09d_2400x1350.jpeg",

           



          ],
        },


        {
          color:`white`,

          image_urls:[

            "https://static0.pocketlintimages.com/wordpress/wp-content/uploads/wm/2025/09/iphone-17-pro-header-final.jpg?w=1600&h=900&fit=crop",

            "https://i.ytimg.com/vi/cUwyBf8vafE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAukDy6woDjSvoEZdJsXSCyrKYuLw",

            "https://i.ytimg.com/vi/K4sRf2vwLwc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBBAwoi8S9FyxmTh52r019o-4wzpQ"


          ]

        },

  

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

  const {userId,productId,Signal} = req.body;
  console.log("this is userId",userId);

  // if(userId.length>0 && productId.length<=0)
  // {
  //   const user = await User.findById(userId);
  // }
  // console.log("ServerSide",userId,productId);

  console.log("here is backend userId and productId and Signal",userId,productId,Signal);

    if(Signal)
  {

    const Empty_Call=await User.findByIdAndUpdate(userId, { $set: { bag: [] } });
    return res.status(200).json({ message: "Order has been placed successfully and bag emptied." });

  }
  

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
          // if (user.bag[productIndex].quantity <= 0) {
          //     console.log(`Removing product ${productId} from cart as quantity is zero.`);
          //     user.bag.splice(productIndex, 1);
          // } else {
          //     console.log(`Decrementing quantity of product ${productId}. New quantity: ${user.bag[productIndex].quantity}`);
          // }

          user.bag.splice(productIndex, 1);
          await user.save();
          return res.status(200).json({ bagItems: user.bag });
      } else {
          console.warn(`Product ${productId} not found in the cart for user ${userId}.`);
          return res.status(404).json({ message: "Product not found in the cart." });
      }
  } catch (error) {
      console.error("Error in deleteCountItems:", error);
      return res.status(500).json({ error: "Internal server error." });
  }
};

const showTotalItemsCount = async (req, res) => {
  try {
    const { userId } = req.body;

    console.log("here is the userID of user",userId);
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Filter out items with null productId
    user.bag = user.bag.filter(item => item.productId !== null);

    // Save the updated user
    await user.save();

    // const totalQuantity = user.bag.reduce((total, item) => {
    //   return total + (item.quantity || 0);
    // }, 0);

    const totalQuantity= user.bag.length;

    console.log("Total quantity after cleaning:", totalQuantity);

    return res.status(200).json({ totalQuantity });
  } catch (error) {
    console.error("Error fetching total items count:", error);
    return res.status(500).json({ error: "Server error" });
  }
};


 const fetchBagItems = async (req, res) => {
  
    const { UID } = req.body;

    console.log("userId:", UID);

    try {
        const user = await User.findById(UID).populate('bag.productId');
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
   console.log("error occuring>>>>>>>>>>>>>>>>!!!!!!!!!!!!!!!!!!!")
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

    res.sendStatus(400)

  }

}


const totalItemsPrice = async (req, res) => {
  try {
    const { UserID} = req.body;
    
    const user=await User.findById(UserID).populate({

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



 const searchHistory = async (req, res) => {
  try {
    const { UID } = req.body;

    console.log("hello searchData is here..>>>")

    const productSchemaData=await ProductD.findById(UID);

    console.log("Product Data>>>>>>",productSchemaData.product_image);



  console.log("backend product ID",UID);
    if (!UID) {
      return res.status(400).json({ error: "Product ID (UID) is required!" });
    }

    // Ensure the productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(UID)) {
      return res.status(400).json({ error: "Invalid Product ID format!" });
    }

    // Update or create the document
    const result = await ProductInsights.findOneAndUpdate(
      { productId: UID },  // 🔥 Only filter by productId (to find existing product)
      { 
        $inc: { searchCount: 1 },  // 🔥 Increment searchCount
        $setOnInsert: {  // 🔥 Set these fields ONLY if creating a new document
          product_image: productSchemaData.product_image,
          product_name: productSchemaData.product_name,
          price: productSchemaData.price
        }

      },
      { new: true, upsert: true } // ✅ Return updated document, create if not found
    );
    

    

      // const newProduct = new ProductInsights({

      //   productId: UID,
      //   product_image: productSchemaData.product_image,
      //   product_name: productSchemaData.product_name,
      //   price: productSchemaData.price,
      //   searchCount: 1,
       
      // },);

      // await newProduct.save();

      // if(!newProduct)
      // {

      // }

    
      // const updatedData = await ProductInsights.findOneAndUpdate(
      //   {},

      //   {
      //     $push: { productDetails: newProduct },//✅ Push new product if it doesn't exist
      //     $inc: { searchCount: 1 }
      //   },
      //   { new: true, upsert: true }
      // );

      return res.status(201).json({
        message: "New search record created!",
      
      });
  } catch (error){
    console.error("Error updating search count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


  const fetchMostSearchedProducts = async (req, res) => {
    try {

      const result = await ProductInsights.find()
       
        .sort({ searchCount: -1 }) 
                                    // Sort in descending order
        .limit(6);                // Get only the top 6 products

        console.log("productInsights",result);
        //  console.log(result);
        console.log('result here insights',result.productId);
         res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  };


  const Gift_Redeem_User = async (req,res)=>{










  }
  const Gifts_DB = async (req, res) => {
    try {
      const gift = await Gift_Schema.create({
        name: "Neckband",
        quantity: 20,
        active: true,
      });
  
      if (!gift) {
        return res.status(500).send("Error in gift schema");
      }
  
      console.log("This is gift schema:", gift);
  
      return res.json({ success: "Gifts stored in DB >>>>>>" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const User_Gift= new Gift_Store_DB({

    // const  {userId,GiftId}=req.body






  });
  

  const AddAndRemoveQuantity=async(req,res)=>{

    const {UserID,Signal,productId}=req.body;

    console.log("UserID,Signal,productId",UserID,Signal,productId)

    if(!UserID)
    {
      res.json({message:"UserId NULL"});
    }

    const user=await User.findById(UserID);

    if(!user)
    {
       res.json({message:"User not found in DB"});
    }

  

    if(Signal==="min")
    {

      const productFound= user.bag.find((item)=>item.productId.toString()===productId.toString())

      // const resp=await user.updateOne({$inc:{quantity:-1}},{new:true});

      if(!productFound)
      {

        return res.json({message:"Product not found in bag"});

      }

      else if(productFound.quantity===0)
      {
        return res.json({message:"Quantity is already zero, cannot decrement further."});
      }
        

      productFound.quantity -=1;

      await user.save();
      
      return res.json({message:"Quantity decreament successfully",Data:productFound.quantity});  

    }

    else if(Signal==="add")    
    {

      
      const productFound= user.bag.find((item)=>item.productId.toString()===productId.toString())

      // const resp=await user.updateOne({$inc:{quantity:-1}},{new:true});
      if(!productFound)
      {
        return res.json({message:"Product not found in bag"});
      }

      else if(productFound.quantity==10)
      {
        return res.json({message:"Quantity already reached to their limit 10, cannot Increament further."});
      }
    
      productFound.quantity +=1;

      await user.save();
    return res.json({message:"Quantity incremented successfully",Data:productFound.quantity});  

    }

  }


  const RazorPay_Gateway_Integration=async(req,res)=>{


    console.log("this is amount coming from frontend",req.body);
    const {amount}=req.body;

    const options={

      amount:amount*100,
      currency:"INR",
      receipt:`order_rcptid_${Date.now()}`


    }


       const instance = new Razorpay({

        key_id:'rzp_test_wuFJ7sKk68vkn4',
        key_secret:'bRnAC5G6JbHXknmWj8GDq0lz',

      });

    try{


   const order= await instance.orders.create(options);
   res.json(order);

    }catch(err){


      res.status(500).send("Order Creation failed");

    }
  
  }


  const handle_Users_Order=async (req,res)=>{


    const {UserID,totalPrice,status,orderDate}=req.body;


    try{
      
    if( !UserID || !totalPrice || !status || !orderDate )
{

  return res.status(405).json({"message":"Fields not Filled Properly"})

}


const user = await User.findById(UserID);

if(!user)
{

  return res.json({"message":"error user not found"});

}

const products =  user.bag.map((item)=>({ productId:item.productId,quantity:item.quantity  }) );



const address =  user.addresses[0]; // Get the last address added by the user

const order=await OrderUser.create({   


  UserID,
  products,
  totalPrice,
  status,
  orderDate,
  address,


  });

  if(!order)
  {
    return res.status(400).json({"message":"here is here to create Document"});
  }

  console.log("Order created successfully", order);

  const only_Order_ID=order.orderID;

  return res.status(200).json({ message: "Order placed successfully", orderID: only_Order_ID });

    }
    catch(err)
    {
       console.error(" Error while placing order:", err); // See detailed error in console
  return res.status(500).json({ message: "Something went wrong", error: err.message });
    }
}



const verify_user_payment = async (req, res) => {
  const { RAZR_PAY_ID_ } = req.body;

  console.log("after varify token.........................................");

  try {
    if (!RAZR_PAY_ID_) {
      return res.status(406).json({ message: "Payment ID not found" });
    }

    const auth = {
      username: "rzp_test_wuFJ7sKk68vkn4",
      password: "bRnAC5G6JbHXknmWj8GDq0lz",
    };

    let response = await axios.get(`https://api.razorpay.com/v1/payments/${ RAZR_PAY_ID_ }`, { auth });

    // Wait and retry if payment is not captured yet
    if (response.data.status !== "captured") {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      response = await axios.get(`https://api.razorpay.com/v1/payments/${RAZR_PAY_ID_}`, { auth });
    }

    
    const paymentStatus = response.data.status;

    if (paymentStatus === "captured") {
      return res.status(200).json({ success: true, payment: response.data });
    } else {
      return res.status(400).json({ success: false, status: paymentStatus });
    }
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error.response?.data || error.message);
    return res.status(500).json({ success: false, message: "Failed to verify payment." });
  }
};


const handle_My_Ordered_Data=async (req,res)=>{


  const {UserID}=req.body;

  
try{

 if (!UserID) {
  return res.status(400).json({ message: "UserID not found in body..." });
}

 const userOrders = await OrderUser.find({

  UserID: UserID,
  
}).select('orderID orderDate status') // Optional: include only these fields.
  .populate('products.productId', 'product_name product_image price '); 


  if(!userOrders)
    {

    return res.status(404).json({"message": "No orders Found for this user." });

    }

  return res.status(200).json({ orders: userOrders });



}catch(error)
{

    return res.status(402).json({"message":"something error..."});


}

}


const changeOrderStatus = async (req, res) => {
  
  const { orderID, status } = req.body;

  console.log(orderID,status);

  if (!orderID || !status ) {

    return res.status(400).json({ message: "Order ID and new status are required." });

  }


  const changeDone=await OrderUser.findOneAndUpdate(
      { orderID },
      { $set: { status } },
      { new: true } // returns the updated document
    );
  if (!changeDone) {
    return res.status(500).json({ message: "Failed to update order status." });
  }
  return res.status(200).json({ message: "Order status updated successfully.", order: changeDone });


}


// const verify_User=async(req,res)=>{

//   const authorization= req.headers.authorization?.split(" ")[1];

//   if(!authorization)
//   {
//     res.send(400).json({message:"authorization not succeeded"});
//   }

//   const success=jwt.verify(authorization,process.env.ACCESS_TOKEN_SECRET)
  







// }

//Filter Seearch Api to Search Data Which user want to search:

const handle_Filter_Search=async (req,res) => {

  const { Item_Name,Range_min,Range_max } = req.query;

  console.log("here is the dataaaaa",Item_Name,Range_min,Range_max);

try{

  const filter={};

 if (Item_Name) {
  
  // filter.company_name = { $regex: Item_Name, $options: "i" };
  // filter.product_name =  { $regex: Item_Name, $options: "i" };

    filter.$or = [
    { company_name: { $regex: Item_Name, $options: "i" } },
    { product_name: { $regex: Item_Name, $options: "i" } }
  ];


  console.log(filter);

}



if (Range_min && Range_max) {
  filter.price = { 
    $gte: Number(Range_min), 
    $lte: Number(Range_max) 
  }
}

   
    const products = await ProductD.find(filter);

    if(!products)
    {
      res.send(403).json({"message":"Sorry something error"});
    }

    res.json(products);

  
}

    catch(error)
    {
       return res.json({"message":"something error in catch block"});
    }

}


// Admin Dashboard Backend Services



const DashboardDataAdmin=async(req,res)=>{


      const dashBoardData=await ProductD.find({},"product_name price quantity inStock");

      if(!dashBoardData)
      {
        return "emptyy data";
      }

      return res.json(dashBoardData);
 

}


// under development
const AdminLoginPage=async (req,res)=>{




  const {AdminEmail,Password}=req.body;


  if(!AdminEmail||!Password)
  {
    console.log("Error Data Insufficient Email or Password Empty");
    return;
  }

}





export { SignUp , Login , Logout , UploadPost , getData , sendDataById , update , user_review , fetch_userReviews ,userSearch , updateProductImage , chatbotResponse , addCountItems , showTotalItemsCount , fetchBagItems ,deleteCountItems , address , changeText , totalItemsPrice , refreshTokenHandler , handleUserIDFetch ,getProductIdFromCookies , searchHistory , fetchMostSearchedProducts , updatePricesSP , Gifts_DB ,Only_refresh_Token_Access_Token_Handler , AddAndRemoveQuantity , RazorPay_Gateway_Integration ,testManuallyCookies , handle_Users_Order , verify_user_payment , handle_My_Ordered_Data,changeOrderStatus , handle_Filter_Search,getDataByItemCategory,DashboardDataAdmin,SignUpAdmin,LoginAdmin};