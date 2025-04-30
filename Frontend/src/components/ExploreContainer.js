import React from 'react'
import "../assets/Style/Explore.css"
import Support from "../assets/images/support.png"
import { useEffect,useState } from 'react'
import Arrow from "../assets/images/right-arrow.png";
import "../assets/Style/Headings.css"


function ExploreContainer() {

    const [count,setCount]=useState(0);


    const ScrollLeft=()=>
        {
            if(count==1)
            {
                const btnMin=document.getElementById("btnMinus");
                btnMin.style.display="none";
            }

            if(count==2)
            {
                const btnPlus=document.getElementById("btnPlus");
                btnPlus.style.display="flex";

            }
            setCount(count-1);
            document.getElementById("Corosel").scrollLeft-=700;
            
    
    
    
        }
    
        const ScrollRight=()=>{

          
           if(count==2)
           {
            const btnPlus=document.getElementById("btnPlus");
            btnPlus.style.display="none";
            return; 
           }
            setCount(count+1);
            console.log(count);
            const btnMin=document.getElementById("btnMinus");
            btnMin.style.display="flex";
            document.getElementById("Corosel").scrollLeft+=700;
    
    
        }
 


  return (

    
    
    <div className=' h-[60vh] pt-16 sm:h-screen'>

        
        <div className="upperSection h-3/6  flex flex-col sm:flex-row">
        <div className='headingCont w-screen  flex items-center justify-center'>
        
            <h1 className='text-3xl w-screen HeadingPlayFair sm:text-6xl sm:w-4/5'>Explore Hundreds of Electronics Products</h1>

            </div>

            <div className='rightupperSection  w-screen grid grid-cols-2 gap-1 items-center  justify-items-center  sm:justify-center'>

                <div className='rightDivs w-1/2 h-3/5 border-l-slate-500 border-l-4 flex flex-col '>
                    <div className='heading pl-3'>
                        <h2 className='text-3xl text-orange-500 sm:text-5xl'>1000+</h2>
                    </div>
                    <div className='para pl-3'>
                        <p className='text-lg'>Smartphones</p>

                    </div>

                </div>

                <div className='rightDivs w-1/2 h-3/5 border-l-slate-500 border-l-4 flex flex-col '>
                    <div className='heading pl-3'>
                        <h2 className='text-3xl text-orange-500 sm:text-5xl'>500+</h2>
                    </div>
                    <div className='para pl-3'>
                        <p className='text-lg'>Laptops</p>

                    </div>

                </div>

                <div className='rightDivs w-1/2 h-3/5 border-l-slate-500 border-l-4 flex flex-col '>
                    <div className='heading pl-3'>
                        <h2 className='text-3xl text-orange-500 sm:text-5xl'>50+</h2>
                    </div>
                    <div className='para pl-3'>
                        <p className='text-lg'>Gaming Console's</p>

                    </div>

                </div>


                <div className='rightDivs w-1/2 h-3/5 border-l-slate-500 border-l-4 flex flex-col '>
                    <div className='heading pl-3'>
                        <h2 className='text-3xl text-orange-500 sm:text-5xl'>1000+</h2>
                    </div>
                    <div className='para pl-3'>
                        <p className='text-lg'>Accessories</p>

                    </div>

                </div>

            </div>
        </div>
        
        {/* <div className='lowerSection h-3/6  flex justify-center items-center'>
      
        <div className='buttonContainer' id="btnMinus">
            <button className='btn text-3xl'  onClick={ScrollLeft}><img src={Arrow} className='arrowImg2 h-7'></img></button>
        </div>
        <div className='ItemsCorosel  flex overflow-scroll' id="Corosel">

         <div className="Items flex justify-center items-center" >
            <div className='logoHeading flex justify-center flex-col items-center'>
                <img src={Support} className='h-12'></img>
                <h2>Support</h2>

            </div>

         </div>

         <div className="Items flex justify-center items-center">
            <div className='logoHeading flex justify-center flex-col items-center'>
                <img src={Support} className='h-12'></img>
                <h2>Support</h2>

            </div>

         </div>

         <div className="Items flex justify-center items-center">
            <div className='logoHeading flex justify-center flex-col items-center'>
                <img src={Support} className='h-12'></img>
                <h2>Support</h2>

            </div>

         </div>


         <div className="Items flex justify-center items-center">
            <div className='logoHeading flex justify-center flex-col items-center'>
                <img src={Support} className='h-12'></img>
                <h2>Support</h2>

            </div>

         </div>

         <div className="Items flex justify-center items-center">
            <div className='logoHeading flex justify-center flex-col items-center'>
                <img src={Support} className='h-12'></img>
                <h2>Support</h2>

            </div>

         </div>

         <div className="Items flex justify-center items-center">
            <div className='logoHeading flex justify-center flex-col items-center'>
                <img src={Support} className='h-12'></img>
                <h2>Support</h2>

            </div>

         </div>

         <div className="Items flex justify-center items-center">
            <div className='logoHeading flex justify-center flex-col items-center'>
                <img src={Support} className='h-12'></img>
                <h2>Support</h2>

            </div>

         </div>


         <div className="Items flex justify-center items-center">
            <div className='logoHeading flex justify-center flex-col items-center'>
                <img src={Support} className='h-12'></img>
                <h2>Support</h2>

            </div>

         </div>


         <div className="Items flex justify-center items-center">
            <div className='logoHeading flex justify-center flex-col items-center'>
                <img src={Support} className='h-12'></img>
                <h2>Support</h2>

            </div>

         </div>

         <div className="Items flex justify-center items-center">
            <div className='logoHeading flex justify-center flex-col items-center'>
                <img src={Support} className='h-12'></img>
                <h2>Support</h2>

            </div>

         </div>


         <div className="Items flex justify-center items-center">
            <div className='logoHeading flex justify-center flex-col items-center'>
                <img src={Support} className='h-12'></img>
                <h2>Support</h2>

            </div>

         </div>

         <div className="Items flex justify-center items-center">
            <div className='logoHeading flex justify-center flex-col items-center'>
                <img src={Support} className='h-12'></img>
                <h2>Support</h2>

            </div>

         </div>

         <div className="Items flex justify-center items-center">
            <div className='logoHeading flex justify-center flex-col items-center'>
                <img src={Support} className='h-12'></img>
                <h2>Support</h2>

            </div>

         </div>
         <div className="Items flex justify-center items-center">
            <div className='logoHeading flex justify-center flex-col items-center'>
                <img src={Support} className='h-12'></img>
                <h2>Support</h2>

            </div>

         </div>
         <div className="Items flex justify-center items-center">
            <div className='logoHeading flex justify-center flex-col items-center'>
                <img src={Support} className='h-12'></img>
                <h2>Support</h2>

            </div>

         </div>
         <div className="Items flex justify-center items-center">
            <div className='logoHeading flex justify-center flex-col items-center'>
                <img src={Support} className='h-12'></img>
                <h2>Support</h2>

            </div>

         </div>



        </div>

        <div className='buttonContainerPlus' id="btnPlus">
            <button className='btn text-3xl'  onClick={ScrollRight}><img src={Arrow} className='arrowImg h-7'></img></button>
        </div>


        </div> */}
        </div>
  )
}

export default ExploreContainer