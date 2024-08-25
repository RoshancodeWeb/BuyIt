"use client"
import React, { useEffect, useState } from 'react';
import Hero from './Components/Hero';
import Product from './Components/Product';
import Category from './Components/Category';
import BestSelling from './Components/BestSelling';
import Poster from './Components/Poster';
import OurProducts from './Components/OurProducts';
import Services from './Components/Services';
import useLoadData from './utils/useLoadData';
import Loading from './Components/Loading';
import { useSelector } from 'react-redux';

const Page = () => {
  
  const allProducts=useSelector(state=>state.products.products);
  // const { loading,error } =allProducts?{loading:false,error:null}:useLoadData();
  const { loading,error } =useLoadData();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='w-full min-h-screen'>
      <Hero />
      <Product />
      <Category />
      <BestSelling />
      <Poster />
      <OurProducts />
      <Services />
    </div>
  );
};

export default Page;
