
import { log } from "console";
import express from "express";

const app = express()

// app.listen(process.env.PORT, ()=>{
//     console.log(`Server listening on :  http://localhost:${process.env.PORT}`);
    
// })

app.listen(3000,()=>{

    console.log("http://localhost:3000");
    

})