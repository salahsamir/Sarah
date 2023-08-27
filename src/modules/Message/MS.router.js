import { Router } from "express";
import * as msController from "./controller/MS.js"
import { Auth } from './../../middleware/auth.js';
import { validation } from "../../middleware/Validation.js";
import { create, update } from "./message.validate.js";
export const MsRouter=Router()

MsRouter.post('/:id',Auth,validation(create),msController.create)
MsRouter.patch('/:id',Auth,validation(update),msController.update)
MsRouter.get('/',Auth,msController.getAll)

