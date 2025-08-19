import jwt from "jsonwebtoken"
import classErrorHandling from "./classErrorHandle.js";



const verifyToken=async(req,res,next)=>{


    const authToken=req.headers.authorization;

    console.log("hello authTokennnnnnnnnnnn",authToken);
  
    if(!authToken)
    {
      // return;
      throw new classErrorHandling("Token not found",401);
    }
  

    const token=authToken.split(" ")[1];
    
  console.log("splitttttttttttttt",token);
    try{
    
      const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
      
      console.log("decodeddddddddddddddd",decoded);
      req.user=decoded;
      
      console.log("before payment verification............................",decoded)

      next();
  
  
    }catch(error)
    {
      next(error);
  
    }

}



export default verifyToken;
