import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Aluno",
    points: 0,
    id: 1,
    currentCategory: 0,
    completedCategories: [],
  });

  const handleNameChange = (value) => {
    setUser((prevUser) => ({
      ...prevUser,
      name: value,
    }));
  };

  const handlePointsChange = (value) => {
    setUser((prevUser) => ({
      ...prevUser,
      points: value,
    }));
  };

  const handleIDChange = (value) => {
    setUser((prevUser) => ({
      ...prevUser,
      id: value,
    }));
  };

  const handleCurrentCategoryChange = (value) => {
    setUser((prevUser) => ({
      ...prevUser,
      currentCategory: value,
    }));
  };

  const handleCompletedCategoriesChange = (completedCategoryIds) => {
    setUser((prevUser) => ({
      ...prevUser,
      completedCategories: completedCategoryIds,
    }));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setName: handleNameChange,
        setPoints: handlePointsChange,
        setID: handleIDChange,
        setCurrentCategory: handleCurrentCategoryChange,
        setCompletedCategories: handleCompletedCategoriesChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};