import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  const updateUserProfile = (profileData) => {
    setUserProfile(profileData);
  };

  return (
    <UserContext.Provider value={{ userProfile, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};