import { createContext, useContext, useEffect, useState } from 'react';

import { storage } from '../firebase';

const storageContext = createContext();

export const StorageContextProvider = ({ children }) => {



  return (
    <storageContext.Provider value={storage}>
      {children}
    </storageContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(storageContext);
};