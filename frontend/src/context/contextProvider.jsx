import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { getUserInfo } from "../../lib/services";


export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUserInfo = async () => {
        const res = await getUserInfo();
        console.log("User info:", res);
        setUser({ auth: res.auth, user: res.user });
    }

    useEffect(() => {
        fetchUserInfo();
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
    
};