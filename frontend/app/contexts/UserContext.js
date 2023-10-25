import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "Aluno", points: 0, id: 1 });

  const handleNameChange = (value) => {
    setUser({ ...user, name: value });
  };

  const handlePointsChange = (value) => {
    setUser({ ...user, points: value });
  };

  const handleIDChange = (value) => {
    setUser({ ...user, id: value });
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, setName: handleNameChange, setPoints: handlePointsChange, setID: handleIDChange }}
    >
      {children}
    </UserContext.Provider>
  );
};
