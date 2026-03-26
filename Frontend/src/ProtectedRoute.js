import React from 'react';
import { useSelector } from 'react-redux';

import { Navigate} from 'react-router-dom';

//children name is compulsory when you have sending the component between protected route
const ProtectedRoute = ({ children }) => {
  //accessing Token From Redux
  const token = useSelector((state) => state.userAuth.token);
  const users = useSelector((state) => state.auth.users);

 const adminOnlyPages = new Set(["AdminDashboard", "AdminAddProduct", "AdminProductsPage"]);
 const childName = children?.type?.name;


 if(adminOnlyPages.has(childName))   // Check if the user is an admin before allowing access to admin pages
 {
  if(users?.user?.role==="admin") // Check if the user role is admin
  {
    return children; // If the user is an admin, render the AdminDashboard component
  }

  return <Navigate to="/users/admin-login" replace />;// If the user is not an admin, redirect to the admin login page
 }

 if (!token) // If there is no token, redirect to the login page
  {
    return <Navigate to="/users/login" replace />;// Redirect to login page if not authenticated
  }

  
return children;
 
};




export default ProtectedRoute; // export default ProtectedRoute;
