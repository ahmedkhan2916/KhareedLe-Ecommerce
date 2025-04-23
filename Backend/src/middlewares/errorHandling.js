
const errorHandling=(err,req,res,next)=>{

    console.log(err.stack);

    const statusCode=err.statusCode || 500 ;
    const message=err.message || "Internal Server Error";

    res.status(statusCode).json({success:false,error:{message}});

}

export default errorHandling;