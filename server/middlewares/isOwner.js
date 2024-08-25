import jwt from "jsonwebtoken"
import ownerModel from "../models/owner.js";

export default async (req,res,next)=>{
    if(req.cookies.token){
       const decode=jwt.verify(req.cookies.token,process.env.JWT_KEY);
       const ownerFound=await ownerModel.findOne({email:decode.email});
       if(ownerFound)
       {
          req.owner=ownerFound;
          next();
       }else{
          return res.json({message:"You are not owner,Cannot add product",success:false});
       }
    }
    else
    {
        return res.json({message:"Please Login or Create Account to add Product",success:false});
    }
}
