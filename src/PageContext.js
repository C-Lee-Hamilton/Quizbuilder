import React, { createContext, useContext, useState } from "react";

const PageContext = createContext();

export const usePageContext = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [username, setUsername] = useState("");

  return (
    <PageContext.Provider
      value={{
        token,
        setToken,
        username,
        setUsername,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
