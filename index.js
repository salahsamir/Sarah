import express  from "express"
import dotenv from "dotenv"
import { initApp } from "./src/App.js"

dotenv.config({path:"./config/.env"})
const app = express()
app.use(express.json())
const port = process.env.PORT
initApp(app,express)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))