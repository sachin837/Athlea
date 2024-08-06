// ModalContext.js
import React, {createContext, useContext, useState} from 'react';

const ModalContext = createContext({
  isVisible: false,
  content: '',
  showModal: () => {},
  hideModal: () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({children}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState('');

  const showModal = content => {
    setContent(content);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setContent('');
  };

  return (
    <ModalContext.Provider value={{isVisible, content, showModal, hideModal}}>
      {children}
    </ModalContext.Provider>
  );
};
