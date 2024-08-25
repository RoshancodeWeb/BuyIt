"use client";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../redux/slice";
import process from "./process";
import { useEffect, useState } from "react";

const useLoadData = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/product/allProducts", {
          credentials: "include",
        });       
        const data=await response.json();
        if (data && data.products) {
          process(data.products);
          console.log(data.products);
          dispatch(addProducts(data.products));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]); 

  return { loading, error };
};

export default useLoadData;




// "use client";
// import { useDispatch, useSelector } from "react-redux";
// import { addProducts } from "../redux/slice";
// import process from "./process";
// import { useEffect, useState } from "react";
// import useSWR from "swr";

// const fetcher=(...args)=>fetch(...args).then(res=>res.json());
// const useLoadData = () => {
//   const dispatch = useDispatch();
//   const {data,isLoading,error,mutate}=useSWR("http://localhost:8000/product/allProducts",fetcher);

//   useEffect(() => {
    
//     const fetchData = async () => {
//       console.log(data);
//           if (data && data.products) {
//           process(data.products);
//           console.log(data.products);
//           dispatch(addProducts(data.products));
//         }
//       }
//     fetchData();
//   }, [dispatch,data]); 

//   return { loading:isLoading, error };
// };

// export default useLoadData;
