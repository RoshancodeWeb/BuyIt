import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken.js";
import ownerModel from "../models/owner.js";
export default async(req,res,next)=>{
    let {email,password}=req.body;
    const owner=await ownerModel.findOne({email});
    
    if(owner)
    {
        bcrypt.compare(password,owner.password,(err,result)=>{
            if(result){
                res.cookie("token",generateToken(owner,"admin"),{maxAge:9600000}); 
                return res.json({message:`Welcome Back ${owner.name} Admin`,success:true,type:"admin"});
            }
            else{
                return res.json({message:`Wrong Password`,success:false});
            } 
            
        });
       
    }
    else{
        next();
    }
}