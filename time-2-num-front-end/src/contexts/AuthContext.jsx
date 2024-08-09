import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token") ? true : false;
  const [isAuthenticated, setIsAuthenticated] = useState(token);

  const login = (userToken) => {
    localStorage.setItem("token", userToken);
    setIsAuthenticated(true);
  };
  const logout = (navigate) => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
