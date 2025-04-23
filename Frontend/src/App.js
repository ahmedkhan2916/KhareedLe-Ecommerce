
import './App.css';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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


function App() {

  // const [log,setLogin]=useState(1)


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

        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Purchasing_page/>}/>
        <Route path="users/login" element={<Login/>}/>
        <Route path='users/signup' element={<Signup/>}></Route>
        <Route path='users/chatbot' element={<Chatbot/>}></Route>
        <Route path="users/customerreview" element={<CustomerReviews/>}></Route>
        <Route path="users/shipping" element={<ShippingAddress/>}></Route>
        <Route path="users/ferris" element={<FerrisWheel/>}></Route>
        <Route path="users/address" element={<Address/>}></Route>
        <Route path="users/payment" element={<PaymentGateway/>}></Route>
        <Route path="users/completed" element={<CongratsPage/>}></Route>
        <Route path="users/confetti" element={<Confetti/>}> </Route>
      </Routes>
      
</Router>


    </div>
  );
}

export default App;
