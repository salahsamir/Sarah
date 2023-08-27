import { UserModel } from '../../../../DB/Models/UserModel.js'
import { Sign } from '../../../utlits/Token.js'
import { hash,  compare } from './../../../utlits/bycript.js'
import { AsyncHandeller } from './../../../utlits/Error.js';

export const SignUp = AsyncHandeller(
  async (req, res, next) => {
  
    const { userName, password, cpassword, email } = req.body
    if (cpassword != password)
      return next (new Error('Invalid password',{cause:404}));
    const user = await UserModel.findOne({ email })
    if (user) return next (new Error("email exist ",{cause:404}))
    const hash_password = hash({ plaintext: password })

    req.body.password = hash_password
    const create = await UserModel.create(req.body)
    return create
      ? res
          .status(201)
          .json({ message: 'done creating', created: true, create })
      : next(new Error('Could not create',{cause:403}))
  
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