import React, { useEffect,useState } from 'react'
import Navbar from './Navbar';
import '../App.css';
import ProductSlider from '../components/ProductSlider.js';
import Specification from '../components/Specification.js';
import ExploreContainer from "../components/ExploreContainer.js";
import SearchedPage from '../pages/SearchedPage.js';
import Footer from './Footer.js';
import Header from './HeaderChange.js';
import Why from "../components/why.js";
import GameConsole from './GameConsole.js';
import MostSearchedSP from "./MostSearchedSP.js";
import NewArrival from './NewArrival.js';
import ShopByCategory from './ShopByCategory.js';
import { useSelector } from 'react-redux';
import {useLocation} from "react-router-dom"
import Welcome from "./Welcome.js"
import "../assets/Style/Headings.css";
import GamingConsoleSection from './GamingConsoleSection.js';

function Home() {

  const location =useLocation();
  
  // const [userS,setUserS]=useState([])
  const dataSearched=useSelector((state)=>state.products.items);
  
  
  // useEffect(()=>{
    
  //   console.log(dataSearched);

  // },dataSearched)

  const {user}=location.state || false;
  console.log("this data is user",user);
  const [showWelcome, setShowWelcome] = useState(true);



  return (
<>
{
  showWelcome ?(<Welcome onFinish={()=>setShowWelcome(false)}></Welcome>):
  (
    <div className="Home w-screen overflow-hidden">

      {/* { log ? (
                       <Signup></Signup>
                    ) : (
    
                        <Navbar></Navbar>
                    )
    } */}
    
    
    {/* <Navbar user={user}></Navbar> */}
    <Header user={user}></Header>


  

    <div className='smartphoneContainer pt-40 z-0'>
      <div className="smartphoneHeading flex justify-center z-0">

    <h1 className='text-3xl bitcount-single-Nothing sm:text-4xl '>PowerFull Smartphones</h1>
    
    </div>
    <ProductSlider></ProductSlider>
    </div>

    
    {/* <SliderWallpaper></SliderWallpaper> */}
    {/* {
      Object.keys(dataSearched).length===0 ? <div>Hello world</div>:<SearchedPage></SearchedPage>


    } */}
    <Specification></Specification>
    <ExploreContainer></ExploreContainer>
    <Why></Why>
    {/* <NewArrival></NewArrival> */}

    <ShopByCategory></ShopByCategory>
    <GameConsole></GameConsole>
    <GamingConsoleSection></GamingConsoleSection>
    <MostSearchedSP></MostSearchedSP>
    <Footer></Footer>
    
  

        </div>
          )}
        </>


  )
}

export default Home