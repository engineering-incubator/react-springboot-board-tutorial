import { createContext, useContext, useState } from "react";

const LoginContext = createContext({});

export function ProvideAuth({ children }) {
  const [userInfo, setUserInfo] = useState();
  const isLoggedIn = () => userInfo !== undefined;
  const value = { userInfo, setUserInfo, isLoggedIn };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}

export function useAuth() {
  return useContext(LoginContext);
}
