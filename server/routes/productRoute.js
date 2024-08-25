import express from "express"
import {addToCart, addToWishList, allCartProducts, allProducts, checkOutProducts, deleteCartProduct, deleteWishListProduct, processCheckout, updateCart, updateResponse, wishListProduct} from "../controllers/productController.js"
import isLoggedIn from "../middlewares/isLoggedIn.js";
const route=express.Router();


route.get("/allProducts",allProducts);
route.get("/addToWishList/:productId",isLoggedIn,addToWishList);
route.get("/userWishlist",isLoggedIn,wishListProduct);
route.delete("/deleteWishListProduct/:productId",isLoggedIn,deleteWishListProduct);
route.post("/addToCart",isLoggedIn,addToCart);
route.get("/allCartProduct",isLoggedIn,allCartProducts);
route.delete("/deleteCartProduct/:productId",isLoggedIn,deleteCartProduct);
route.post("/updateCart",isLoggedIn,updateCart);
route.post("/checkOut",isLoggedIn,processCheckout);
route.get("/getCheckOuts",isLoggedIn,checkOutProducts);
route.put("/updateCheckoutResponse/:checkOutId",isLoggedIn,updateResponse);

export default route;