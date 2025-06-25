
import './App.css';


import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';

import Home from './components/Home.js';
import Purchasing_page from './pages/Purchasing_page.js';
import Login from './pages/login.js';
import Signup from "./pages/signup.js";
import Chatbot from "./pages/Chatbot.js";
import CustomerReviews from './pages/CustomerReviews.js';
import ShippingAddress from './pages/ShippingAddress.js';
import FerrisWheel from './components/FerrisWheel.js';
import Address from './pages/Address.js';
import PaymentGateway from './pages/PaymentGateway.js';
import CongratsPage from "./pages/CongratsPage.js"
import Confetti from "./pages/Confetti.js";
import CartPage from "./pages/New_Cart_Page_Design.js";
import RazorpayButton from "./components/RazorpayButton.js";
import GsapAnimation from './pages/GsapAnimation.js';
import { increment, fetchBagData,refreshToken,fetchUserID} from './store/dataSlice.js';

function App() {

  // const [log,setLogin]=useState(1)

  const { token, status,errorAccess  } = useSelector((state) => state.userAuth);
  const {UserID,StatusID,ErrorID}=useSelector((state)=>state.fetchID);
  // const { totalBag,statusTotalBag,errorBagTotal,}=useSelector((state)=>
    // const [signal,setSignal]=useState(false);



  const dispatch = useDispatch();

  //  useEffect(()=>{

  //   if(token && UserID)
  //   {
  //     setSignal(true); // Set signal to true to indicate that data fetching is complete
  //   }



  //  },[token,UserID])

  // 1. On load, get accessToken using refreshToken stored in cookie




  // 3. Once userId is available, fetch user's data (bag, cart, etc.)
  // useEffect(() => {
  //   if (userId) {
  //     dispatch(fetchBagData(userId));
  //     dispatch(fetchCartData(userId));
  //     // add more: fetchOrders(userId), fetchWishlist(userId) etc.
  //   }
  // }, [userId, dispatch]);









  return (



    
    <div className="App">

{/* { log ? (
                   <Signup></Signup>
                ) : (

                    <Navbar></Navbar>
                )
} */}

<Router>
  
      <Routes>

 <Route path="/" element={ <Home />} />
      <Route path="/users/login" element={<Login />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/product/:id" element={<Purchasing_page />}/>
        {/* <Route path="users/login" element={<Login/>}/> */}
        <Route path='users/signup' element={<Signup/>}></Route>
        <Route path='users/chatbot' element={<Chatbot/>}></Route>
        <Route path="users/customerreview" element={<CustomerReviews/>}></Route>
        <Route path="users/shipping" element={<ShippingAddress/>}></Route>
        <Route path="users/ferris" element={<FerrisWheel/>}></Route>
        <Route path="users/address" element={<Address/>}></Route>
        <Route path="users/payment" element={<PaymentGateway/>}></Route>
        <Route path="users/completed" element={<CongratsPage/>}></Route>
        <Route path="users/confetti" element={<Confetti/>}> </Route>
         <Route path="users/Cart" element={<CartPage/>}> </Route>
          <Route path="users/Razorpay" element={<RazorpayButton/>}> </Route>
          <Route path="users/Gsap" element={<GsapAnimation/>}> </Route>
      </Routes>
      
</Router>


    </div>
  );
}

export default App;
