import React, {createContext, useState, useContext} from 'react';

// Type definition for context value for better TypeScript support
interface InputContextType {
  inputValue: string | null; // Adjust the type according to your needs
  setInputValue: React.Dispatch<React.SetStateAction<string | null>>;
}

const InputContext = createContext<InputContextType | undefined>(undefined);

export const useInput = () => {
  const context = useContext(InputContext);
  if (context === undefined) {
    throw new Error('useInput must be used within an InputProvider');
  }
  return context;
};

export const InputProvider: React.FC = ({children}) => {
  const [inputValue, setInputValue] = useState<string | null>(null);
  console.log('inputValue', inputValue);
  return (
    <InputContext.Provider value={{inputValue, setInputValue}}>
      {children}
    </InputContext.Provider>
  );
};
