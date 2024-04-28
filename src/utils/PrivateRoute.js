import { Outlet, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = () => {
  //   const { user } = useContext(AuthContext);
  const [user, setUser] = useState(true);
  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
