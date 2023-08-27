
export const AsyncHandeller=(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(err=>{
            return next(new Error(err))
        })
    }
}



export const GlobalError=(err,req,res,next)=>{  
    if(err){
        return res.status(500||err.cause).json({message:err.message,stack:err.stack})
    }
}