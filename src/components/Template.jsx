import React,{useState,useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Signup from "../pages/Signup.jsx";
import Login from "../pages/Login.jsx";
import { Link } from 'react-router-dom';


export default function Template() {
  const[template,setTemplate]=useState([]);
  // const[topText,setToptext]=useState("");
  // const[bottomText,setBottomtext]=useState("");

   useEffect(()=>{

   const fetchdata=async()=>
   {
    try{
    const res=await fetch("https://api.imgflip.com/get_memes");
    if(!res.ok)
    {
      throw new Error("error");
    }
    const data=await res.json();
    setTemplate(data.data.memes);
  }
    catch(err)
    {
      console.error("failed to catch templates",err);
    }
  };
  fetchdata();
    
  },[]);
 
 return (
    <div className="bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJEhfk3A8B9WGyy_cTRL5Nc_b0Sze4WX27rg&s)] bg-cover bg-center min-h-screen p-4">

   <nav className="bg-gray-100 p-6 mb-6 pl-13 shadow-md">
        <div className="flex justify-between items-center pl-10">
          <h1 className="text-black text-3xl font-bold text-center w-full">
            Welcome to Meme Generator!
          </h1>
          <div className="absolute right-6 flex gap-3 pr-10">
            <Link
              to="/signup">
              <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Sign Up
              </button>   
            </Link>
            <Link
              to="/login"><button className="px-4 py-2 bg-pink-800 text-white rounded hover:bg-pink-900 transition">Login</button>
            </Link>
            <br/>
            <br/>
          </div>
        </div>
      </nav>
      
    <div className="grid grid-cols-3  gap-6">
      {template.slice(0, 20).map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
        >
          <img
            src={item.url}
            alt={item.name}
            className="w-full h-40 object-cover"
          />
          <p className="p-2 text-center font-medium">{item.name}</p>
        </div>
      ))}
    </div>
    </div>
  );
}