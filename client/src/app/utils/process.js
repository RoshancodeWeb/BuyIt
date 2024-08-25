export default (products)=>{
    for(let i=0;i<products.length;i++){
        let product=products[i];
        for(const key in product){
            if(key=="productImage"){
              const buffer=product[key].data;
              const base64Image=Buffer.from(buffer).toString("base64");
              const imageSrc=`data:image/jpeg;base64,${base64Image}`;
              products[i][key]=imageSrc;
            }else if(key=="productPrice"){
                if(product["productDiscount"]!==0){

                  products[i]["realDiscount"]=product["productDiscount"];
                  const discountedPrice=Math.round(((product[key]/100)*product["productDiscount"]));
                  products[i]["productDiscount"]=discountedPrice;
                  products[i][key]=Math.round(product[key]-discountedPrice);

                }
            }
        }
    }
    return products;
}