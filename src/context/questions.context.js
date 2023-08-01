import React, { createContext, useState } from 'react';

// we provide empty fn as defaults so it doesn't break the app if forget to pass a fn
export const QuestionContext = createContext({
  questions: {
    quest: {
      question: '',
      category: [],
    },
    alreadyCalled: [''],
    reset: () => {},
    setQuest: () => {},
    setAlreadyCalled: () => {},
  },
});

export function QuestionProvider({ children }) {
  const [quest, setQuest] = useState({
    question: '',
    category: [],
  });
  const [alreadyCalled, setAlreadyCalled] = useState('');

  const reset = () => {
    if (window.confirm('are you sure')) {
      setQuest('...');
      setAlreadyCalled([]);
    } else {
      console.log('no thanks');
    }
  };

  return (
    <QuestionContext.Provider
      value={{
        quest,
        setQuest,
        alreadyCalled,
        setAlreadyCalled,
        reset,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
export default QuestionContext;
