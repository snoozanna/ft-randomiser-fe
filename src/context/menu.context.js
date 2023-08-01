import React, { createContext, useState } from 'react';

// we provide empty fn as defaults so it doesn't break the app if forget to pass a fn
export const MenuContext = createContext({
  menu: {
    isOpen: false,
    currentPage: '',
    open: () => {},
    close: () => {},
    toggle: () => {},
    setCurrentPage: () => {},
  },
});

export function MenuProvider({ children }) {
  const [isOpen, setState] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const open = () => setState(true);
  const close = () => setState(false);
  const toggle = () => {
    setState(!isOpen);
  };

  return (
    <MenuContext.Provider
      value={{
        isOpen,
        currentPage,
        open,
        close,
        toggle,
        setCurrentPage,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
export default MenuContext;
