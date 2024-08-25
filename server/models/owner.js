import mongoose from "mongoose";

const ownerSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const ownerModel= mongoose.model("owner",ownerSchema);
export default ownerModel