import { UserModel } from '../../../../DB/Models/UserModel.js'
import { Sign, Verify } from '../../../utlits/Token.js'
import { hash,  compare } from './../../../utlits/bycript.js'
import { AsyncHandeller } from './../../../utlits/Error.js';
import sendEmail from './../../../utlits/SendEmail.js';

export const SignUp = AsyncHandeller(
  async (req, res, next) => {
  
    const { userName, password, cpassword, email } = req.body
    if (cpassword != password)
      return next (new Error('Invalid password',{cause:404}));
    const user = await UserModel.findOne({ email })
    if (user) return next (new Error("email exist ",{cause:404}))
    const token=Sign({payload:{email}})
    const confirem_link=`${req.protocol}://${req.headers.host}/auth/confiremEmail/${token}`
    // const refresh_link=`${req.protocol}://${req.headers.host}/auth/refresh/${ref_token}`
    const send_email=await sendEmail({to:email,subject:"confirem emial",html:`<a href=${confirem_link}> click here to confirem your email</a>
    <br>
     
    `})
  if(!send_email){
    return next(new Error('email reject',{cause:400}))
  }  
    const hash_password = hash({ plaintext: password })

    req.body.password = hash_password
    const create = await UserModel.create(req.body)
    return create
      ? res
          .status(201)
          .json({ message: 'please check your email', created: true  })
      : next(new Error('Could not create',{cause:403}))
  
}
)
export const confiremEmail=AsyncHandeller(
  async(req,res,next)=>{
    const {token}=req.params;
    const {email}=Verify({payload:token});
    const update_feild=await UserModel.findOneAndUpdate({email},{confiremEmail:true},{new:true})
    return update_feild?res.status(200).json(update_feild):next (new Error("some thing wrong"))
  }
)
export const SignIn =AsyncHandeller(
  async (req, res, next) => {

    const { password, email } = req.body

    const user = await UserModel.findOne({ email })
    if(!user){
      return next(new Error('Could not find account',{cause:403}));
    }  
    
  
    
    const match= compare({plaintext:password,hashValue:user.password})
    
    if(!match){
  
      return  next(new Error('invalid password',{cause:403}))
    }
    user.status='online'
    user.isDeleted=false
    await user.save()
    const accessToken = Sign({ payload: { id:user._id,isLoggin:true } })
    return user
      ? res
          .status(200)
          .json({ message: 'done creating', user: true ,accessToken })
      : next (new Error('Could not login',{cause:400}))

}

)
