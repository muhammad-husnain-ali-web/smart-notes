import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";

const PublicRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    console.log("PublicRoute user:", user);
    if(user === null){
        return <Loader />;
    }
    if(user.auth){
        return <Navigate to="/" replace />;
    }
    return children;
}

export default PublicRoute;