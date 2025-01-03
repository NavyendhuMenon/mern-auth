
import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./database/mongoConnection.js";
import userRoutes from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"
import adminRoute from './routes/adminRoute.js'
import cookieParser from "cookie-parser";
dotenv.config()

connectToDatabase();

const app = express()

app.use(express.json())

app.use(cookieParser())

app.listen(3000, ()=>{
    console.log(`Server listening on :  http://localhost:${process.env.PORT}`);
    
})


app.use("/api/user", userRoutes)
app.use("/api/auth", authRoute)
app.use("/api/admin", adminRoute)

