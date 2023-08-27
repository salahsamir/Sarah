
import { messageModel } from "../../../../DB/Models/MessageModel.js";
import { UserModel } from "../../../../DB/Models/UserModel.js";
import { AsyncHandeller } from "../../../utlits/Error.js";



export const create=async(req,res,next) =>{
 const{_id}=req.user
const {id}=req.params
const {message}=req.body;
const find=await UserModel.findById(id);
if(!find){
    return res.status(404).json({message:"invalid reciver id"});

}

const created = await messageModel.create({message: message,sender:_id,reciver:id})
// console.log(created);
return create? res.status(201).json({message:"done",created:true,created}) : res.status(404).json({message:"some thing wrong",created:false})
}
export const update=AsyncHandeller(
    async(req,res,next)=>{
        const {_id}=req.user;
        const {message}=req.body;
        const {id}=req.params;
        const check_message=await messageModel.findOneAndUpdate({_id:id,sender:_id},{message},{new:true})
        return check_message?res.status(200).json({message:check_message}):next (new Error('Could not update message',{cause:404}))
    }
)
export const getAll=AsyncHandeller(
    async(req,res,next) => {
        const message = await messageModel.find({sender:req.user._id})
        return message?res.status(200).json({message}):next(new Error(`Could not find any message`,{cause:404}))
    }
)