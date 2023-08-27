
import joi from "joi";
import { generalFields } from './../../middleware/Validation.js';
 export const create=joi.object({
     id:generalFields.id,
     message:joi.string().required()
 })
 export const update=joi.object({
    id:generalFields.id,
    message:joi.string().required()
})