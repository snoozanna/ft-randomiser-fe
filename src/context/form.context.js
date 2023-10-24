import React, { createContext, useState } from 'react';

// we provide empty fn as defaults so it doesn't break the app if forget to pass a fn
export const FormContext = createContext({
  form: {
    firstName: '',
    lastName: '',
    email: '',
    bsl: '',
    setFirstName: () => {},
    setLastName: () => {},
    setEmail: () => {},
    setBSL: () => {},
  },
});

export function FormProvider({ children }) {
  const [firstName, setFirstName] = useState('e');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [BSL, setBSL] = useState(false);

  return (
    <FormContext.Provider
      value={{
        firstName,
        lastName,
        email,
        BSL,
        setFirstName,
        setLastName,
        setEmail,
        setBSL,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
export default FormContext;
