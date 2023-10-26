import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "Aluno", points: 0, id: 1, currentCategory: 0,
completedCategories: [] });

  const handleNameChange = (value) => {
    setUser({ ...user, name: value });
  };

  const handlePointsChange = (value) => {
    setUser({ ...user, points: value });
  };

  const handleIDChange = (value) => {
    setUser({ ...user, id: value });
  };

  const handleCurrentCategoryChange = (value) => {
    setUser({ ...user, currentCategory: value });
  };
  const handleCompletedCategoriesChange = (completedCategoryIds) => {
    setUser({ ...user, completedCategories: completedCategoryIds });
  };
  return (
    <UserContext.Provider
      value={{ user, setUser, setName: handleNameChange, setPoints: handlePointsChange, 
        setID: handleIDChange, setCurrentCategory: handleCurrentCategoryChange,
        setCompletedCategories: handleCompletedCategoriesChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
