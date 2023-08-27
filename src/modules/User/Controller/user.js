import { UserModel } from "../../../../DB/Models/UserModel.js";
import { AsyncHandeller } from "../../../utlits/Error.js";
import {  compare, hash } from './../../../utlits/bycript.js';

export const profile=AsyncHandeller(
   async(req,res,next) =>{
      const {_id}=req.user;
      if(!_id) return next(new Error('Invalid profile',{cause:403}));
      const user=await UserModel.findById(_id);
      return user?res.status(200).json(user):next (new Error('Profile not found',{cause:403}));
    }
)

export const getuser=AsyncHandeller(
   async(req,res,next) =>{
      const {_id}=req.params;
      if(!_id) return next(new Error('Invalid profile',{cause:403}));
      const user=await UserModel.findById(_id).populate({
         path:"Message",
         select:"message"
      });
      return user?res.status(200).json(user):next (new Error('Profile not found',{cause:403}));
    }
)
  
export const UpdatePassword = AsyncHandeller(
   async(req, res,next) =>{
      const {_id}=req.user
      const { oldpassword,password,cPassword } = req.body;
      if(password!=cPassword){
         return next(new Error('Invalid password',{cause:403}))
      }
      const user=await UserModel.findById({_id})
      if(!user){
         return next(new Error("User not found",{cause:403}))
      }
      if(!compare({plaintext:oldpassword,hashValue:user.password})){
         
         return next(new Error("password wrong",{cause:403}))
      }
   
      const value=hash({plaintext:password})
      user.password=value;
      await user.save()
      return res.status(200).json({message:"success"})
   }
)

export const Update=AsyncHandeller(
   async(req,res,next)=>{
      const{_id}=req.user
      const{age,userName}=req.body;
      const check_user=await UserModel.findById(_id);
      if(!check_user)return next (new Error('User not found',{cause:403}));
      check_user.age=age;
      check_user.userName=userName;
      check_user.save();
      return res.status(200).json({message:"success"})
   }
)
export const Delete=AsyncHandeller(
   async(req,res,next) => {
      const {_id}=req.user;
      const check_user=await UserModel.findByIdAndUpdate(_id,{isDeleted:true},{new:true})
      if(!check_user)return next (new Error('User not found',{cause:403}));
      return res.status(200).json({message:"success"})
   }
)