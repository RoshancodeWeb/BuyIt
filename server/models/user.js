import mongoose from "mongoose";

const userSchema=mongoose.Schema({
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
        require:true
    },
    WishList:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
        }
    ]

   
});



const userModel=mongoose.model("user",userSchema);
export default userModel
