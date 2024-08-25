import express from "express"
import { createOwner, createProduct, deleteProduct, getAllOrderList, updateProduct } from "../controllers/ownerController.js";
import upload from "../config/multer-connection.js";
import isOwner from "../middlewares/isOwner.js";
import handleEditFile from "../middlewares/handleEditFile.js";


const route=express.Router();



// if(process.env.NODE_ENV==="development")
// {
//     route.post("/create",createOwner);
// }
route.post("/create",createOwner);
route.post("/productCreate",isOwner,upload.single("productImage"),createProduct);
route.put("/updateProduct/:productId",handleEditFile,updateProduct);
route.delete("/deleteProduct/:productId",isOwner,deleteProduct);
route.get("/orderList",isOwner,getAllOrderList);


export default route;