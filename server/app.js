import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import index from "./routes/index.js"
import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"
import ownerRouter from "./routes/ownerRoute.js"
import connection from './config/mongoose-connection.js'

import productModel from "./models/product.js";
import userModel from "./models/user.js";
import ownerModel from "./models/owner.js";
import CheckOutModel from "./models/checkout.js"
import cartModel from "./models/cart.js";



configDotenv();


const app=express();

const corsOptions={
    credentials:true,
    origin:"http://localhost:3000"
}

app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true,limit:'50mb'}));
app.use(express.json({limit:'50mb'}));
app.use(cookieParser());



app.use("/",index);
app.use("/user",userRoute);
app.use("/owner",ownerRouter);
app.use("/product",productRoute);


app.listen(process.env.PORT,()=>{
    console.log(`Server Started With Port ${process.env.PORT}`);
});