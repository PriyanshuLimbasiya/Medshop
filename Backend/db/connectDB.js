const mongoose=require("mongoose");
const dotenv=require("dotenv");

dotenv.config();
const connectDB=async()=>{
    try{
        const uri=process.env.MONGO_URI;
        await mongoose.connect(uri);
        console.log("⚡Database connected successfully");
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}
module.exports=connectDB;