import mongoose from "mongoose";
const checkSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
    },
    streetAddress:{
        type:String,
        required:true
    },
    apartment:{
        type:String
    },
    phoneNumber:{
        type:Number
    },
    cityName:{
        type:String
    },
    emailAddress:{
      type:String
    },
    products:[
        { 
            productId:{
                type:Array,
                default:[]
            },
            quantity:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                required:true,
                default:0
            },
            size:{
                type:String,
                default:'No Size'
            }
        } 
    ],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    typeDelivery:{
        type:String,
        required:true
    },
    checkOutAt:{
        type:Date,
        default:Date.now()
    },
    totalAmount:{
        type:Number,
        default:0
    },
    productReceived:{
        type:String,
        default:"pending"
    }
});

const CheckOutModel= mongoose.model("CheckOut",checkSchema);
export default CheckOutModel