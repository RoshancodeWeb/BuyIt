import upload from "../config/multer-connection.js";

export default (req, res, next) => {
   
    if (req.body.productImage === "") {
     
      return next();
    }

    return upload.single("productImage")(req,res,next);
};