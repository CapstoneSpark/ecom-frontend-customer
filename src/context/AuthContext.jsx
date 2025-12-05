
import React, { createContext, useState, useEffect, useContext } from "react";
import { getStoredUser, logout as logoutUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const loginUser = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    logoutUser();
  };

  const isAdmin = user?.roles?.includes("ADMIN");

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// ⭐ ADD THIS
export const useAuth = () => useContext(AuthContext);
