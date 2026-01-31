import {useNavigate} from 'react-router-dom';
import React,{useEffect,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Navigate} from 'react-router-dom';

//children name is compulsory when you have sending the component between protected route
const ProtectedRoute = ({ children }) => {
  //accessing Token From Redux
  const token = useSelector((state) => state.userAuth.token);
 const navigate=useNavigate();
 console.log("children is here",token);

 if (!token) {
    return <Navigate to="/users/login" replace />;
  }

return children;
 
};




export default ProtectedRoute; // export default ProtectedRoute;
