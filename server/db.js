import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{dbName:"curd_operation"})
        console.log("Successfull connection");
        
    }catch(err) {
        console.log("error in connecting db",err);
    }
}