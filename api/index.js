
import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./database/mongoConnection.js";
dotenv.config()

connectToDatabase();

const app = express()
app.listen(3000, ()=>{
    console.log(`Server listening on :  http://localhost:${process.env.PORT}`);
    
})
