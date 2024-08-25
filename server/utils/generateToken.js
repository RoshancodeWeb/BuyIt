import jwt from "jsonwebtoken"

export default function(user){
  if(arguments['1']){
    return jwt.sign({email:user.email,id:user._id,type:arguments['1']},process.env.JWT_KEY)
  }else{
    return jwt.sign({email:user.email,id:user._id,type:"common"},process.env.JWT_KEY)

  }
}