import { useQuery } from '@apollo/client';
import React, { createContext, useEffect, useState } from 'react';
import GET_ALL_UNASKED_Q from '../queries/GET_ALL_UNASKED_Q';
import Loader from '../components/Loader';

// we provide empty fn as defaults so it doesn't break the app if forget to pass a fn
export const QuestionContext = createContext({
  questions: {

    allUnaskedQuestions: [],
    potentialQuestion: {},
    currentQuestion: {},
    alreadyCalled: [""],
    questionError: "",
    loadAllQuestionsRequired: "",
    resetRequired: "",
    reset: () => {},
    removeQuestionFromUnasked: () => {},
    setAlreadyCalled: () => {},
    setAllUnaskedQuestions: () => {},
    setPotentialQuestion: () => {},
    setCurrentQuestion: () => {},
    setQuestionError: () => {},
    setLoadAllQuestionsRequired: () => {}, 
    setResetRequired: () => {}
  },
  sequence: {
    questionSequence: {
      sequenceLevel: "",
      questions: [],
      label: ""
    },
    questionSequenceIndex: 0,
  },
});

export function QuestionProvider({ children }) {
  const [potentialQuestion, setPotentialQuestion] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [alreadyCalled, setAlreadyCalled] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [questionSequence, setQuestionSequence] = useState({
    sequenceLevel: null,
    questions: [],
    label: ''
  });
  const [questionSequenceIndex, setQuestionSequenceIndex] = useState(-1);
   const [allUnaskedQuestions, setAllUnaskedQuestions] = useState([]);
   const [loadAllQuestionsRequired, setLoadAllQuestionsRequired] = useState(true)
     const [resetRequired, setResetRequired] = useState(false);


   const removeQuestionFromUnasked = (questionToRemove) => {
    console.log(`removing ${questionToRemove.question} from unasked`)
     setAllUnaskedQuestions((questions) =>
       questions.filter((question) => question._id !== questionToRemove._id),
     );
   };


   const countQuestionsByCategory = (questions) => {
     const categoryCounts = {};
     questions.forEach((question) => {
       const category = question.category.name;
       if (categoryCounts[category]) {
         categoryCounts[category]++;
       } else {
         categoryCounts[category] = 1;
       }
     });

     return categoryCounts;
   };
    const countQuestionsByLevel = (questions) => {
      const levelCounts = {};
      questions.forEach((question) => {
        const level = question.level;
        if (levelCounts[level]) {
          levelCounts[level]++;
        } else {
          levelCounts[level] = 1;
        }
      });

      return levelCounts;
    };

  const countQuestionsByNonNeg = (questions) => {
       const nonNegCounts = {};
       questions.forEach((question) => {
         const nonNeg = question.nonNeg;
         if (nonNegCounts[nonNeg]) {
           nonNegCounts[nonNeg]++;
         } else {
           nonNegCounts[nonNeg] = 1;
         }
       });

       return nonNegCounts;
     };

  useEffect(() => {
    console.log("useEffect runs");
    const categoryCounts = countQuestionsByCategory(allUnaskedQuestions);

    const levelCounts = countQuestionsByLevel(allUnaskedQuestions);

    const nonNegCounts = countQuestionsByNonNeg(allUnaskedQuestions);
    Object.keys(categoryCounts).forEach((category) => {
      if (categoryCounts[category] <= 5) {
        console.log(
          `Category "${category}" has ${categoryCounts[category]} or fewer questions.`,
        );
         setResetRequired(true)
      }
    });

    Object.keys(nonNegCounts).forEach((nonNeg) => {
      if (nonNegCounts[nonNeg] <=5) {
        console.log(
          `Category "${nonNeg}" has ${nonNegCounts[nonNeg]} or fewer questions.`,
        );
         setResetRequired(true);
      }
    });

    Object.keys(levelCounts).forEach((level) => {
      if (levelCounts[level] <= 5) {
        console.log(
          `Category "${level}" has ${levelCounts[level]} or fewer questions.`,
        );
         setResetRequired(true);
      }
    });

    console.log("categoryCounts", categoryCounts);
    console.log("levelCounts", levelCounts);
    console.log("nonNegCounts", nonNegCounts);
  }, [allUnaskedQuestions]);   

   
  
 

//TODO Put this in an if block 
  
    // console.log("no of unasked q", allUnaskedQuestions.length);


  return (
    <QuestionContext.Provider
      value={{
        potentialQuestion,
        setPotentialQuestion,
        currentQuestion,
        setCurrentQuestion,
        alreadyCalled,
        setAlreadyCalled,
        questionError,
        setQuestionError,
        allUnaskedQuestions,
        setAllUnaskedQuestions,
        questionSequence,
        setQuestionSequence,
        questionSequenceIndex,
        setQuestionSequenceIndex,
        loadAllQuestionsRequired,
        setLoadAllQuestionsRequired,
        resetRequired, 
        setResetRequired,
        removeQuestionFromUnasked,

      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
export default QuestionContext;
