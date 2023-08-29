import { Router } from "express";
import * as userController from "./Controller/user.js"
import { Auth } from './../../middleware/auth.js';
import { validation } from "../../middleware/Validation.js";
import { UploadImage, getUser, update, updatePassword } from "./userValidtion.js";
import { fileUpload, fileValidation } from "../../utlits/multer.js";

export const userRouter=Router()
userRouter.get('/profile',Auth,userController.profile)
userRouter.get('/:_id',validation(getUser),userController.getuser)
userRouter.post('/image',Auth,fileUpload(fileValidation.image).single('image'),validation(UploadImage),userController.upload)
userRouter.patch('/password',Auth,validation(updatePassword),userController.UpdatePassword)
userRouter.put('/',Auth,validation(update),userController.Update)
userRouter.delete('/',Auth,userController.Delete)





