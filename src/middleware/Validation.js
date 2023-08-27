import joi from 'joi'
import { Types } from 'mongoose'
const validateObjectId = (value, helper) => {
 
    return Types.ObjectId.isValid(value) ? true : helper.message('In-valid objectId')
}
export const generalFields = {

    email: joi.string().email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: { allow: ['com', 'net',] }
    }).required(),
    password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
        "string.pattern.base":'invalid password'
    }),
    cpassword: joi.string().valid(joi.ref('password')).required(),

    id: joi.string().custom(validateObjectId).required(),
    opatinid: joi.string().custom(validateObjectId),

    file: joi.object({
        size: joi.number().positive().required(),
        path: joi.string().required(),
        filename: joi.string().required(),
        destination: joi.string().required(),
        mimetype: joi.string().required(),
        encoding: joi.string().required(),
        originalname: joi.string().required(),
        fieldname: joi.string().required()

    })
}

export const validation = (schema) => {
    return (req, res, next) => {
       const inputs={...req.body,...req.query,...req.params}

       if(req.file||req.files){
 inputs.file=req.file||req.files
       }
       const validation=schema.validate(inputs,{abortEarly:false})
       if(validation.error){
        return res.status(400).json({validation:validation.error.details})
        
       }
       return next()
    }
}