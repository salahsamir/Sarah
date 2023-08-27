import { DB_Connected } from "../DB/DbConnection.js"
import { authRouter } from "./modules/Auth/auth.router.js"
import { MsRouter } from "./modules/Message/MS.router.js"
import { userRouter } from "./modules/User/user.router.js"
import { GlobalError } from "./utlits/Error.js"


export const initApp=(app,express)=>{
    
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('/auth',authRouter)
    app.use('/user',userRouter)
    app.use('/message',MsRouter)
    app.use(GlobalError)
    app.all('*',   (req, res) => res.send('this router not exist'))
    DB_Connected()
}