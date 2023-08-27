import { UserModel } from "../../DB/Models/UserModel.js"
import { AsyncHandeller } from "../utlits/Error.js"
import { Verify } from "../utlits/Token.js"


export const Auth=AsyncHandeller(
  async(req,res,next)=>{
    const {authorization}=req.headers
  if(!authorization?.startsWith(process.env.BEARER)){
   return next(new Error("invalid authorization",{cause:400}))
  }
  const text=authorization.split(process.env.BEARER)[1]
   if(!text) return next(new Error("invalid token",{cause:403}))
   const{id}=Verify({payload:text})
   if(!id) return next(new Error("invalid  data",{cause:400}))
  const user=await UserModel.findById(id)
  if(!user) return next(new Error("account not exist",{cause:404}))
  req.user=user
  return next()

}
)