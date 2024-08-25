import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt"
import ownerModel from "../models/owner.js";
import productModel from "../models/product.js"
import cartModel from "../models/cart.js"
import CheckOutModel from "../models/checkout.js";

export const createOwner=async (req,res)=>{
    let {fullname,email,password} =req.body;

    try {
         const user=await ownerModel.findOne({email});
         if(user) return res.json({message:"Account Already Exists,Login",success:false});
         bcrypt.genSalt(10,(err,salt)=>{
         bcrypt.hash(password,salt,async (err,hash)=>{
             let userCreated=await ownerModel.create({name:fullname,email,password:hash});
             res.cookie("token",generateToken(userCreated),{maxAge:9600000});
             res.json({message:"Account Created Successfully,LogIn",success:true});
         })
         })
    } catch (error) {
       console.log(error.message);
    }
}

export const createProduct=async(req,res)=>{
   
   let {productName,productDescription,productDiscount,productPrice,justForYou,ourProduct,billBoard,xs,xl,s,m,l,category,productQuantity,productImage}=req.body;
   try {
    const sizes=[];
    if(xs!=='false'){sizes.push("XS")};
    if(xl!=='false'){sizes.push("XL")};
    if(s!=='false') {sizes.push("S")};
    if(m!=='false') {sizes.push("M")};
    if(l!=="false") {sizes.push("L")};
    
    const productCreated=await productModel.create({
     productName,
     productDescription,
     productPrice,
     productDiscount,
     productImage:req.file.buffer,
     billBoards:{
         categoryOne:billBoard==="Hero Bill Board"?"Hero Bill Board":"",
         categoryTwo:billBoard==="Category Bill Board"?"Category Bill Board":""
     },
     SpecialCategory:{
         categoryOne:justForYou==="false"?"":"Just For You",
         categoryTwo:ourProduct==="false"?"":"Our Product"
     },
     Sizes:sizes,
     Category:category,
     quantity:productQuantity,
     createdBy:req.owner.name
    });
    res.json({message:"Product Created Successfully",success:true});
   } catch (error) {
     console.log(error);
   }
  
} 


export const updateProduct=async(req,res)=>{
    
    const {productId}=req.params;
    let {productName,productDescription,productDiscount,productPrice,justForYou,ourProduct,billBoard,xs,xl,s,m,l,category,productQuantity,productImage}=req.body;
   try {
    const sizes = [];
    if (xs !== 'false' && xs !== '') { sizes.push("XS") };
    if (xl !== 'false' && xl !== '') { sizes.push("XL") };
    if (s !== 'false' && s !== '') { sizes.push("S") };
    if (m !== 'false' && m !== '') { sizes.push("M") };
    if (l !== 'false' && l !== '') { sizes.push("L") };
    
    if(productImage==""){
        const productUpdated=await productModel.findOneAndUpdate({_id:productId},{
            productName,
            productDescription,
            productPrice,
            productDiscount,
            billBoards:{
                categoryOne:billBoard==="Hero Bill Board"?"Hero Bill Board":"",
                categoryTwo:billBoard==="Category Bill Board"?"Category Bill Board":""
            },
            SpecialCategory:{
                categoryOne:justForYou==="false"?"":"Just For You",
                categoryTwo:ourProduct==="false"?"":"Our Product"
            },
            Sizes:sizes,
            Category:category,
            quantity:productQuantity,
            createdBy:"Umair"
           //  createdBy:req.owner.name
           },
           {new:true}
       );
       res.json({message:"Product Updated Successfully",updatedProduct:productUpdated,success:true});

    }
    else{
        const productUpdated=await productModel.findOneAndUpdate({_id:productId},{
            productName,
            productDescription,
            productPrice,
            productDiscount,
            productImage:req.file.buffer,
            billBoards:{
                categoryOne:billBoard==="Hero Bill Board"?"Hero Bill Board":"",
                categoryTwo:billBoard==="Category Bill Board"?"Category Bill Board":""
            },
            SpecialCategory:{
                categoryOne:justForYou==="false"?"":"Just For You",
                categoryTwo:ourProduct==="false"?"":"Our Product"
            },
            Sizes:sizes,
            Category:category,
            quantity:productQuantity,
            createdBy:"Umair"
           //  createdBy:req.owner.name
           },
           {new:true}
       );
       res.json({message:"Product Updated Successfully",updatedProduct:productUpdated,success:true});

    }
    
   
   } catch (error) {
     console.log(error);
   }
  
}


    export const deleteProduct=async(req,res)=>{
    try {
        const {productId}=req.params;
        const productDelted=await productModel.findOneAndDelete({_id:productId});
        
        const allCart=await cartModel.find();
        
        await Promise.all(allCart.map(async(cart,index)=>{
            const newProducts=cart.products.filter(product=>product.productId!=productId);
            cart.products=newProducts;
            await cart.save();
        }))
        

        res.json({message:"Product Deleted Successfully",success:true});
    } catch (error) {
        console.log(error);
    }
    }

export const getAllOrderList=async (req,res)=>{
    try {
        const checkOuts=await CheckOutModel.find().populate("userId");
        
        if(checkOuts.length>0){
            res.json({checkOuts:checkOuts,success:true});
        }else{
            res.json({message:"No Orders Made By Customers",success:true});
        }
        
     } catch (error) {
        console.log(error);
     }
}