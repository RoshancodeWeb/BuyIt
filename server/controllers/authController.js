import userModel from "../models/user.js";
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken.js";
import ownerModel from "../models/owner.js";

export const registerUser=async (req,res)=>{
 
   let {fullname,email,password} =req.body;

   try {
        const user=await userModel.findOne({email});
        if(user) return res.json({message:"Account Already Exists,Login",success:false});
        bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            let userCreated=await userModel.create({name:fullname,email,password:hash});
            // res.cookie("token",generateToken(userCreated),{maxAge:9600000});
            res.json({message:"Account Created,LogIn",success:true});
        })
        })
   } catch (error) {
      console.log(error.message);
   }
   


}

export const loginUser=async (req,res)=>{
    let {email,password}=req.body;
    try {
        const user=await userModel.findOne({email});
        if(!user) {
          return res.json({message:"Do'nt have account,Create One",success:false});
        }
        
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                res.cookie("token",generateToken(user),{maxAge:96000000000}); 
                return res.json({message:`Welcome Back ${user.name}`,success:true,type:"common"});
            }else{
                return res.json({message:"Wrong Password",success:false});
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}
export const logOutUser=(req,res)=>{
  try {
    if(req.cookies.token){
        res.cookie("token","");
        return res.json({message:'User Successfully Logged Out',success:true});
      }else{
        return res.json({message:'Please Log In',success:false});
      }
    
  } catch (error) {
    console.log(error.message);
  }
  
}