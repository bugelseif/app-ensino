import { createContext, useState } from "react";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "Aluno", points: 0 });

  const handleNameChange = (value) => {
    setUser({ ...user, name: value });
  };

  const handlePointsChange = (value) => {
    setUser({ ...user, points: value });
  };

  return (
    <UserContext.Provider
      value={{ user, setName: handleNameChange, setPoints: handlePointsChange }}
    >
      {children}
    </UserContext.Provider>
  );
};
