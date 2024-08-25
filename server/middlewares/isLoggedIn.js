import jwt from "jsonwebtoken";


export default (req,res,next)=>{
    if(req.cookies.token){
       
        let user=jwt.verify(req.cookies.token,process.env.JWT_KEY);
        req.user=user;
        next();
    }else{
        return res.json({message:"UnAuthorized",success:false});
    }
}