import React, { createContext, useState } from 'react';

// we provide empty fn as defaults so it doesn't break the app if forget to pass a fn
const ParticipantContext = createContext({
  participant:{
    personHasSperm: true,
    setPersonHasSperm: () =>{}
  }
});

export function ParticipantProvider({ children }) {
  const [personHasSperm, setPersonHasSperm] = useState(false);
  return (
    <ParticipantContext.Provider
      value={{
        personHasSperm,
        setPersonHasSperm,
      }}
    >
      {children}
    </ParticipantContext.Provider>
  );
}

export default ParticipantContext;
