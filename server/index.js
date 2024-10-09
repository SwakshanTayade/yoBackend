import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./db.js";
import route from "./routes/route.js";
const app = express();
app.use(express.json());
dotenv.config();


connectDB();
//cors configuration
const prodOrigin = [process.env.ORIGIN_1, process.env.ORIGIN_2]
const devOrigin = ['http://localhost:5173',]
const allowedOrigins = process.env.NODE_ENV === 'production' ? prodOrigin : devOrigin 
app.use(cors({
    origin:(origin, callback)=>{
        if(!origin || allowedOrigins.includes(origin)) {
            // console.log(origin, allowedOrigins);
            callback(null, true);
        }else {
            // console.log('Cors origin blocked',origin);
            callback(new Error('Not Allowed by CORS'));
        }
    },
    credentials:true,
    methods:['GET','POST','PUT','DELETE'],
}));


app.get("/",(req,res)=>{
    res.send("hello")
})


const port = process.env.PORT || 8001
app.listen(port,(req,res)=>{
    console.log(`server successfull listening on port ${port} `);
    
})
app.use("/api",route);