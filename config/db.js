import mongoose from 'mongoose';
import config from 'config';

const uri=config.get("mongoURI");

const connectDB =async ()=>{
    try{
        await mongoose.connect(uri,{useNewUrlParser:true});
        console.log("Mongodb Connectedd...");
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

export default connectDB;