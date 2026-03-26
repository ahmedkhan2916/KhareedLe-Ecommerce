

const adminAndSellerAuth=async(req,res,next)=>{ 


    const isAdmin=req.user.role;

  if(isAdmin!=="admin")
  {

    return res.status(403).json({message:"Access denied. Admins only."});


  }

  next();


}



export default adminAndSellerAuth;