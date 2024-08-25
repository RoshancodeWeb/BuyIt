import mongoose from "mongoose";


const productSchema=mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productDiscount:{
        type:Number,
        required:true
    },
    productImage:Buffer,
    billBoards:{
        categoryOne:{
            type:String, 
            default:""  
        },
        categoryTwo:{
            type:String, 
            default:""  
        },
    },
    SpecialCategory:{
        categoryOne:{
            type:String, 
            default:""  
        },
        categoryTwo:{
            type:String, 
            default:""  
        },
    },
    Sizes:{
        type:Array,
        default:[]
    },
    Category:{
        type:String,
        required:true
    },
    quantity:{
       type:Number,
       required:true
    },
    soldTimes:{
        type:Number,
        default:0
    },
    createdBy:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const productModel= mongoose.model("product",productSchema);
export default productModel