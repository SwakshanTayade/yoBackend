import express from "express"
import dotenv from "dotenv"
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors);
dotenv.config();

app.listen(process.env.PORT,(req,res)=>{
    console.log(`server successfull listening on port ${process.env.PORT} `);
    
})