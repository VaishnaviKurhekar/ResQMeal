import React, { createContext, useContext, useEffect, useState } from "react";
import { registerUser, loginUser } from "../services/authService";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  /* Attach token to axios */
  useEffect(() => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
}, [token]);

  /* Restore auth on refresh */
//   useEffect(() => {
//   if (token) {
//     try {
//       const savedUser = JSON.parse(localStorage.getItem("user"));
//       if (savedUser) {
//         setUser(savedUser);
//       } else {
//         logout();
//       }
//     } catch {
//   localStorage.clear();
//   setUser(null);
//   setToken(null);
// }
//   }
//   setLoading(false);
// }, [token]);
useEffect(() => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (storedToken && storedUser) {
    setToken(storedToken);
    setUser(JSON.parse(storedUser));
  }

  setLoading(false);
}, []);
  const register = async (name, email, password, role) => {
    try {
      const res = await registerUser({ name, email, password, role });
      

      localStorage.setItem("token", res.data.token);
      const userData = res.data.user || {
        id: res.data.id,
        name: res.data.name,
        role: res.data.role,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      setToken(res.data.token);
      setUser(userData);

      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await loginUser({ email, password });

      localStorage.setItem("token", res.data.token);
      const userData = res.data.user || {
        id: res.data.id,
        name: res.data.name,
        role: res.data.role,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      setToken(res.data.token);
      setUser(userData);

      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = !!token;
  

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        register,
        login,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);