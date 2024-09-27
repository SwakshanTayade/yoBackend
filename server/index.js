import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./db.js";
import route from "./routes/route.js";
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();


connectDB();

app.get("/",(req,res)=>{
    res.send("hello")
})


const port = process.env.PORT || 8001
app.listen(port,(req,res)=>{
    console.log(`server successfull listening on port ${port} `);
    
})
app.use("/api",route);