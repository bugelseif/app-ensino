import { createContext, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const UserContext = createContext();
// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
