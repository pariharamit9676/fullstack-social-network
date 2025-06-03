import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { disconnectSocket, onOnlineUsersUpdate } from "../socket";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const [onlineUsers, setOnlineUsers] = useState([]);
    // 🔹 Login Function
    const login = async (loginDetails, setErr) => {
        try {
            const res = await axios.post("http://localhost:3000/api/auth/login", loginDetails, {
                withCredentials: true
            });
            setCurrentUser(res.data.userInfo);
            return res;
        } catch (err) {
            console.log("Error: ", err);
            setErr(err.response?.data?.error || "Something went wrong");
        }
    };

    // 🔹 Logout Function
    const logout = async () => {
        try {
            await axios.get(`http://localhost:3000/api/auth/logout/${currentUser.id}`,{
                withCredentials: true
            });
            disconnectSocket();
            setCurrentUser(null);
            localStorage.removeItem("user");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    useEffect(() => {
        if (currentUser) {
            onOnlineUsersUpdate((users) => {
                console.log("Online users updated:", users);
                setOnlineUsers(users);
            });
            localStorage.setItem("user", JSON.stringify(currentUser));
        }
    }, [currentUser]);
    

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
