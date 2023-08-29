import { Router } from "express";
import * as authController from "./controller/auth.js"
import { validation } from "../../middleware/Validation.js";
import { confirem, login, signup } from "./auth.validate.js";
export const authRouter=Router()
authRouter.post('/signup',validation(signup),authController.SignUp)
authRouter.get('/confiremEmail/:token',validation(confirem),authController.confiremEmail)

authRouter.post('/signIn',validation(login),authController.SignIn)

