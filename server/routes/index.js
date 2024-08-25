import express from "express"
const route=express.Router();

route.get("/",(req,res)=>{
     res.json({message:"Hello"});
})

export default route;