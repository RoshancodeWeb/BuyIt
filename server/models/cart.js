import mongoose from "mongoose";

const cartSchema=mongoose.Schema({
    userId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"user"
    },
    products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"product",
                required:true
            },
            quantity:{
                type:Number,
                default:1,
                required:true
            },
            price:{
                type:Number,
                required:true,
                default:0
            },
            size:{
                type:String,
            }
        } 
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }

})

 const cartModel =mongoose.model("cart",cartSchema);
 export default cartModel