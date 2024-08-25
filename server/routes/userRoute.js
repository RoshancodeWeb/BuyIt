import express from "express"
import { loginUser, logOutUser, registerUser } from "../controllers/authController.js";
import checkOwner from "../middlewares/checkOwner.js";

const route=express.Router();


route.post("/register",registerUser);
route.post("/login",checkOwner,loginUser);
route.get("/logout",logOutUser);


export default route;