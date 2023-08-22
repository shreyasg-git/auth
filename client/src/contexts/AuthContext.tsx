import React, { Children, useContext, useMemo, useState } from "react";

type AuthContextData = {
  user?: {
    email: string;
  };
  isLoggedIn: boolean;
};

const getCookieValueByName = (name: string) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

const AuthContext = React.createContext<AuthContextData>({ isLoggedIn: false });

const AuthContextProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState({});
  const isLoggedIn = useMemo(() => {
    const token = getCookieValueByName("Authorization");

    console.log("TOKENNNNNNNNNN", { token });

    if (token) {
      return true;
    }

    return false;
  }, [user]);

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside AuthContext");
  }
  console.log(context);

  return context;
};

export default AuthContextProvider;
