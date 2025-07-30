"use client";
import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const markLoadingComplete = () => {
    setIsLoadingComplete(true);
  };

  return (
    <LoadingContext.Provider value={{ isLoadingComplete, markLoadingComplete }}>
      {children}
    </LoadingContext.Provider>
  );
};