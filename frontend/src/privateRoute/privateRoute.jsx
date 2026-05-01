import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    console.log("PrivateRoute user:", user);
    if(user === null){
        return <div className="w-screen h-screen flex justify-center items-center">Loading...</div>;
    }
    if(!user.auth){
        return <Navigate to="/auth/login" replace />;
    }
    return children;
}

export default PrivateRoute;
