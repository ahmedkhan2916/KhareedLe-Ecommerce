import React, { useEffect } from 'react'
import Navbar from './Navbar';
import '../App.css';
import ProductSlider from '../components/ProductSlider.js';
import Specification from '../components/Specification.js';
import ExploreContainer from "../components/ExploreContainer.js";
import SearchedPage from '../pages/SearchedPage.js';
import Footer from './Footer.js';
import Header from './HeaderChange.js';
import Why from "../components/why.js";
import NewArrival from './NewArrival.js';
import ShopByCategory from './ShopByCategory.js';
import { useSelector } from 'react-redux';
import {useLocation} from "react-router-dom"
import "../assets/Style/Headings.css";

function Home() {

  const location =useLocation();
  
  // const [userS,setUserS]=useState([])
  const dataSearched=useSelector((state)=>state.products.items);
  
  
  // useEffect(()=>{
    
  //   console.log(dataSearched);

  // },dataSearched)

  const {user}=location.state || false;
  console.log("this data is user",user);

  return (

    <div className="Home">

      {/* { log ? (
                       <Signup></Signup>
                    ) : (
    
                        <Navbar></Navbar>
                    )
    } */}
    
    
    {/* <Navbar user={user}></Navbar> */}
    <Header user={user}></Header>


  

    <div className='smartphoneContainer pt-40'>
      <div className="smartphoneHeading flex justify-center">

    <h1 className='text-4xl HeadingPlayFair'>PowerFull Smartphones</h1>
    
    </div>
    <ProductSlider></ProductSlider>
    </div>

    
    {/* <SliderWallpaper></SliderWallpaper> */}
    {
      Object.keys(dataSearched).length===0 ? <div>Hello world</div>:<SearchedPage></SearchedPage>


    }
    <Specification></Specification>
    <ExploreContainer></ExploreContainer>
    <Why></Why>
    {/* <NewArrival></NewArrival> */}

    <ShopByCategory></ShopByCategory>
    <Footer></Footer>
    
  

        </div>

    
  )
}

export default Home