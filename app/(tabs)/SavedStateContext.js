import React, { createContext, useState } from 'react';

export const SavedStateContext = createContext();

export const SavedStateProvider = ({ children }) => {
  const [isEventTypeSaved, setIsEventTypeSaved] = useState(false);
  const [isBudgetSaved, setIsBudgetSaved] = useState(false);

  return (
    <SavedStateContext.Provider value={{ isEventTypeSaved, setIsEventTypeSaved, isBudgetSaved, setIsBudgetSaved }}>
      {children}
    </SavedStateContext.Provider>
  );
};
