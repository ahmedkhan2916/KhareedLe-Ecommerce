import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { refreshToken } from './store/dataSlice.js';

//children name is compulsory when you have sending the component between protected route
const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = useSelector(
    (state) =>
      state.userAuth.token ||
      state.authAdmin.admin?.accessToken ||
      state.auth.users?.accessToken
  );
  const authStatus = useSelector((state) => state.userAuth.status);
  const authUser = useSelector(
    (state) => state.authAdmin.admin?.user || state.auth.users?.user
  );

 const adminOnlyRoutes = new Set([
  "/users/admindash",
  "/users/adminadd",
  "/users/adminproducts",
 ]);
 const isAdminRoute = adminOnlyRoutes.has(location.pathname);

 useEffect(() => {
  if (!token && authStatus === "idle") {
    dispatch(refreshToken());
  }
 }, [authStatus, dispatch, token]);

 if (!token && (authStatus === "idle" || authStatus === "loading"))
 {
  return null;
 }

  if(isAdminRoute)   // Check if the user is an admin before allowing access to admin pages:
  {
  if (authStatus === "idle" || authStatus === "loading")
  {
    return null;
  }

  if(authUser?.role==="admin") // Check if the user role is admin:
  {
    return children; // If the user is an admin, render the AdminDashboard component:
  }

  return <Navigate to="/users/admin-login" replace />;// If the user is not an admin, redirect to the admin login page
 }

 if (!token ) // If there is no token, redirect to the login page
  {
    return <Navigate to="/users/login" replace />;// Redirect to login page if not authenticated
  }

  
return children;
 
};




export default ProtectedRoute; // export default ProtectedRoute;
