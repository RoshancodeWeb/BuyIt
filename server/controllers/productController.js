import cartModel from "../models/cart.js";
import CheckOutModel from "../models/checkout.js";
import productModel from "../models/product.js"
import userModel from "../models/user.js";


export const  allProducts=async (req,res)=>{
   try {
        const allProduct=await productModel.find();
        if(allProduct){
        return res.json({products:allProduct,success:true});
        }
        else{
        return res.json({message:"No Products Exists",success:false});
        }
   } catch (error) {
      console.log(error.message);
   }

}

export const addToWishList=async (req,res)=>{
   try {
      const user=await userModel.findOne({email:req.user.email});

      if(user){
         if(user.WishList.includes(req.params.productId)){
             return  res.json({message:"Product Already Exists in WishList",success:false});
         }
           user.WishList.push(req.params.productId);
           await user.save();
           res.json({message:"Product Added To WishList",user:user,success:true});

      }
      else{
        res.json({message:"You are required to Login or SignUp",success:false});
      }
   } catch (error) {
      console.log(error.message);
   }
     
}
export const wishListProduct=async (req,res)=>{
   const  userFound=await userModel.findOne({email:req.user.email}).populate("WishList");
   res.json({message:userFound,success:true});
}
export const deleteWishListProduct=async(req,res)=>{
    try {
      const  userFound=await userModel.findOne({email:req.user.email});
      const {productId}=req.params;
      const index=userFound.WishList.indexOf(productId);
      userFound.WishList.splice(index,1);
      await userFound.save();
      const  newUser=await userModel.findOne({email:req.user.email}).populate("WishList");
      res.json({message:"Product Deleted Successfully",user:newUser.WishList,success:true});
    } catch (error) {
      console.log(error);
    }
    
}


export const addToCart=async (req,res)=>{
   try {
   const {productId,quantity,price,size}=req.body;
   const  user=req.user;
   const cart=await cartModel.findOne({userId:user.id});
   if(!cart){ 
      const createdCart=await cartModel.create({userId:user.id,products:[{productId,quantity,price,size}]});
      return res.json({message:"Product Added To Cart Successfully",success:true});
   }else{
      const index=cart.products.findIndex(product=>product.productId==productId);
      if(index===-1){
         cart.products.push({productId,quantity,price,size});
         await cart.save();
         return res.json({message:"Product Added To Cart Successfully",success:true});
      }else{
         return res.json({message:"Product Already Exists In Cart",success:false});
      }
   }
   } catch (error) {
      console.log(error.message);
   }
   


}

export const updateCart=async (req,res)=>{
   try {
   const user=req.user;
   let { counters,prices }=req.body;

   const cart=await cartModel.findOne({userId:user.id}); 
   for(let i=0;i<counters.length;i++)
   {
   
      cart.products[i].quantity=counters[i];
      cart.products[i].price=prices[i];
   }
   cart.updatedAt=Date.now(); 

   await cart.save();

   return res.json({message:"Cart Updated Successfully",success:true});
   } catch (error) {
       console.log(error.message);
   }
   

}

export const allCartProducts=async (req,res)=>{
   try {
      const user=req.user;
      const cart=await cartModel.find({userId:user.id});
      if(cart.length>0){
         return res.json({cartProducts:cart,success:true});
      }
      else{
         return res.json({message:"Add Items To Cart",success:false});
      }
      
   } catch (error) {
      console.log(error.message);
   }
   

}


//to compare ObjectIds properly, you should use the equals method provided by Mongoose. This is because ObjectIds are not simple strings, and direct comparison using !== may not work as expected.

export const deleteCartProduct=async (req,res)=>{
   try {
      const {productId}=req.params;
      
      const user=req.user;
      const userCart=await cartModel.findOne({userId:user.id});
      const newCartProduct = userCart.products.filter(product => !product.productId.equals(productId));
      
      userCart.products=newCartProduct;
      await userCart.save();

      res.json({message:"Product Removed Successfully From Cart",success:true});

   } catch (error) {
      console.log(error.message);
   }
   
}


export const processCheckout=async (req,res)=>{
  try {
   const user=req.user;
   let cart=await cartModel.findOne({userId:user.id});

   let {apartmentName,cityName,companyName,emailAddress,fullName,paymentMethod,phoneNumber,streetAddress,totalAmount,products}=req.body;
   let checkOutPlaced=await CheckOutModel.create({name:fullName,companyName,streetAddress,apartment:apartmentName,phoneNumber,cityName,emailAddress,products,userId:user.id,typeDelivery:paymentMethod,totalAmount});
   cart.products=[];
   await cart.save();

   for(let i=0;i<products.length;i++){
      let updateProduct=await productModel.findOne({_id:products[i].productId});
      updateProduct.quantity=updateProduct.quantity==0?0:updateProduct.quantity-products[i].quantity;
      updateProduct.soldTimes+=products[i].quantity;
      await updateProduct.save();
   }

   res.json({message:"Check Out Completed Successfully",success:true});

  } catch (error) {
     console.log(error.message);
  }

}

export const checkOutProducts=async(req,res)=>{
   try {
      const user=req.user;
      const checkOuts=await CheckOutModel.find({userId:user.id});
      
      res.json({checkOuts:checkOuts,success:true});
   } catch (error) {
      console.log(error);
   }
  
}
export const updateResponse=async(req,res)=>{
    const {checkOutId}=req.params;
    const checkOutFound=await CheckOutModel.findOneAndUpdate({_id:checkOutId},{productReceived:"Recieved"},{new:true});
    res.json({message:"Updated Successfully",success:true});
}


