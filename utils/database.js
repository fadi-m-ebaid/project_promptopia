import mongoose from "mongoose";

let isConected = false;

export const connectToDB = async () =>{
    mongoose.set('strictQuery', true);

    if(isConected){
        console.log("MongoDB is already connected")
        return
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "share_prompt",
            //useNewUriParser: true,
            //useUnifiedTopology: true
        })
        isConected = true
        console.log("MongoDB Connected")
    }
    catch(error){
        console.log(error)
    }
}