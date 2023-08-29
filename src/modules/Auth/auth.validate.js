import joi from 'joi'
import { generalFields } from '../../middleware/Validation.js'

export const signup=joi.object({
    userName:joi.string().required().min(3),
    email:generalFields.email,
    password:generalFields.password,
    cpassword:generalFields.cpassword,
    age:joi.number(),
    phone:joi.string(),
    gender:joi.string()


})
export const login=joi.object({

    
    email:generalFields.email,
    password:generalFields.password,



})

export const confirem=joi.object({
    token:joi.string().required()
})