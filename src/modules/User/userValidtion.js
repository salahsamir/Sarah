import joi from "joi";
import { generalFields } from './../../middleware/Validation.js';

export const getUser=joi.object({
    _id:generalFields.id
})

export const updatePassword=joi.object({
    oldpassword:generalFields.password,
    password:generalFields.password,
    cPassword:generalFields.cpassword
})
export const update=joi.object({
    age:joi.number(),
    userName:joi.string()
})