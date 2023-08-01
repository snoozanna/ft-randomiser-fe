import React, { createContext, useState } from 'react';

// we provide empty fn as defaults so it doesn't break the app if forget to pass a fn
const AccessContext = createContext({
  bsl: {
    isShowing: false,
    show: () => {},
    hide: () => {},
    toggle: () => {},
  },
});

export function AccessProvider({ children }) {
  const [isBSLShowing, setIsBSLShowing] = useState(false);
  // console.log('isBSLShowing', isBSLShowing);
  // const show = () => useState(true);
  // const hide = () => useState(false);
  const toggle = () => {
    setIsBSLShowing(!isBSLShowing);
  };
  return (
    <AccessContext.Provider
      value={{
        isBSLShowing,
        // show,
        // hide,
        toggle,
      }}
    >
      {children}
    </AccessContext.Provider>
  );
}

export default AccessContext;
