  "use client"
  import { getCookie, getCookies } from 'cookies-next';
  import Link from 'next/link';
  import { usePathname, useRouter } from 'next/navigation';
  import React, { useEffect, useState } from 'react'
  import { CiSearch } from "react-icons/ci";
  import { CiMenuFries } from "react-icons/ci";
  import { IoCloseOutline } from "react-icons/io5";
  import { RiAdminFill } from "react-icons/ri";
  import { useDispatch, useSelector } from 'react-redux';
  import { Bounce, ToastContainer, toast,Zoom } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';
import { setUserType } from '../redux/userSlice';




  const NavBar = () => {

    const [showMenu, setShowMenu] = useState(false);
    const [cookieValue, setCookieValue] = useState(null); 
    const pathname=usePathname();
    const route=useRouter();
    const[isAdmin,setAdmin]=useState("");
    const dispatch=useDispatch();
    const userType=useSelector(state=>state.user.userType);
    
    

    useEffect(()=>{
      console.log(userType);
      if(!getCookie("token")){
          dispatch(setUserType("common"));
      }
      setAdmin(userType);
    },[userType]);
    

    
  

    useEffect(() => {
      const cookie=getCookie("token");
      setCookieValue(cookie);
    },[pathname]);

    const checkLogin=(path)=>{
      const cookie=getCookie("token");
      if(!cookie){
        toast.error(`Login Or Create Account`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }else{
        if(isAdmin=="admin"){
          
          toast.info(`Admin Cannot Visit it`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        }else{
          if(path=="/WishList"){
            route.push("/WishList");
          }else{
            route.push("/Cart");
          }
        }
        
      
      }
    }

    const logOutUser=async()=>{
      setShowMenu(false);
      const response=await fetch("http://localhost:8000/user/logout",{
        credentials:"include"
      });

      const res=await response.json();
      if(res.success==true){
        setCookieValue(getCookie("token"));
      }
      dispatch(setUserType("common"));
      route.push("/");
    }
     
    useEffect(()=>{
       setShowMenu(false);
    },[pathname]);
    
    return (
      <>
      
      <div className='w-full h-[100px] bg-white border-b-[1px] fixed z-50 top-0 border-slate-200 flex items-center md:items-center justify-between ' >
        <div className='w-fit h-full flex items-center'>
              {showMenu?(<IoCloseOutline onClick={()=>setShowMenu(false)}  className='text-2xl md:hidden'/>):(<CiMenuFries className=' font-bold md:hidden' onClick={()=>setShowMenu(true)}/>)}
              <Link href="/"><img src='/images/logo.png' alt='logo' className='w-20 h-20' /></Link>
        </div>
        
        <div className={`absolute  ${showMenu?'left-0':'left-[-100%]'} md:relative md:top-0 md:left-0  z-50 top-[100px] min-w-[250px] md:w-fit h-screen  md:h-full md:flex-row-reverse md:items-center  bg-black text-black md:bg-white md:text-white flex flex-col  gap-2  pt-2 md:pt-0`}>
            
            {/* <div className='w-full md:w-fit h-fit mb-2 flex mr-2 ml-2 md:mr-0 md:mb-0  lg:ml-10'>
              <input className='bg-slate-200 w-[250px] outline-none  text-black px-2 py-1' text="text" placeholder='What are you looking for?' />
              <CiSearch  className='text-xl text-black bg-slate-200 w-fit p-2 border-l-2 border-r-2 border-slate-500 h-full'/>
            </div> */}
            <div className='w-full h-fit flex flex-col gap-3 p-2 md:p-0 md:gap-6 text-white md:text-black md:flex-row md:items-center md:text-sm lg:text-lg lg:font-light'>
              <Link href="/" className={`hover:scale-125 w-fit relative ${pathname=="/"?"font-bold underline scale-105":''} origin-left md:origin-center transition-transform cursor-pointer hover:underline`}>Home</Link>
              <Link href="/Contact" className={`hover:scale-125 w-fit relative ${pathname=="/Contact"?"font-bold underline scale-105":''} origin-left md:origin-center transition-transform cursor-pointer hover:underline`}>Contact</Link>
              <Link href="/About" className={`hover:scale-125 w-fit relative ${pathname=="/About"?"font-bold underline scale-105":''} origin-left md:origin-center transition-transform cursor-pointer hover:underline`}>About</Link>
              {cookieValue ?(<p onClick={logOutUser} className='hover:scale-125 w-fit relative origin-left md:origin-center transition-transform cursor-pointer hover:underline'>Logout</p>):(<Link href="/SignUp" className={`hover:scale-125 w-fit relative ${pathname=="/SignUp"?"font-bold underline scale-105":''} origin-left md:origin-center transition-transform cursor-pointer hover:underline`}>SignUp</Link>)}
              {cookieValue && isAdmin=="common"?(<Link href="/List" className={`hover:scale-125 w-fit relative origin-left md:origin-center ${pathname=="/List"?"font-bold underline scale-105":''} transition-transform cursor-pointer hover:underline`}>Ordered Items</Link>):<></>}

            </div>
        </div>
        <div className='w-fit h-full flex items-center z-50 gap-2 pr-2  lg:gap-5 lg:pr-5'>
          <button onClick={()=>checkLogin("/WishList")}><img src='./images/like.png'  className='w-4  lg:w-6 cursor-pointer hover:scale-110'  alt='' /></button>
          <button onClick={()=>checkLogin("/Cart")} href="/Cart"><img src='./images/cart.png'  className=' w-6  lg:w-8  hover:scale-110 cursor-pointer' alt='' /></button>
          {isAdmin=="admin" ?<Link href="/Admin" className='w-fit h-fit'><RiAdminFill className='text-2xl  lg:w-6 cursor-pointer hover:scale-110'/></Link>:<></>}
        </div>
      </div>
      {/* <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="light"
      /> */}
      </>
    )
  }

  export default NavBar
