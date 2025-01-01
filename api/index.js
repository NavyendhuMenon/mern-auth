
import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./database/mongoConnection.js";
import userRoutes from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"
dotenv.config()

connectToDatabase();

const app = express()
app.use(express.json())
app.listen(3000, ()=>{
    console.log(`Server listening on :  http://localhost:${process.env.PORT}`);
    
})


app.use("/api/user", userRoutes)
app.use("/api/auth", authRoute)

