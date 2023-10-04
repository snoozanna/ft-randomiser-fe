import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { markAsAskedDB, sendCurrentCallToDB } from "../utils/utils.js";
import { QuestionContext } from '../context/questions.context';
import Loader from './Loader';
import { useQuery } from '@apollo/client';

const AskQuestionStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .lock-in {
    background: #5cc45c;
  }
  .states {
    display: flex;
    flex-direction: column;
  }
`;

const AskQuestion = ({questionToAsk}) => {
  // TODO YOU HAVE TO PRESS AN ALREADY LOCKED IN QUESTION TWICE
  console.log("Ask Question Renders")
  const [status, setStatus] = useState(false)
  const [requireLockInState, setRequireLockInState] = useState(false);
  const [lockInOptions, setLockInOptions] = useState([]);
  const [alreadyLockedIn, setAlreadyLockedIn] = useState(false)
 const { question } = questionToAsk;
 const standInLockInQ = {
   __typename: "Question",
   question: "Do you have a favouriter Doctor Who?",  
   _id: "0c11fb08-4568-4c2b-9e29-c2d9e0d24c17",
   category: {
     __typename: "Category",
     name: "Material Possessions",
   },
   level: "deep",
   beenAsked: false,
   requireLockIn: false,
   nonNeg: true,
   documentary: false,
 };
useEffect(() => {
  console.log("alreadyLockedIn has changed", alreadyLockedIn);
}, [alreadyLockedIn]);

  const askQuestion = (questionToAsk) => {

      // - takes in question
      const { question } = questionToAsk;
      console.log("trying to ask", question);
      // - check for lock in and offer alternative

      if (alreadyLockedIn===true){
        console.log("already locked in ")
      }
        if (question.requireLockIn && !alreadyLockedIn) {
          console.log("requires lock in");
          setRequireLockInState(true);
          // save lockin options in state and offer options
          setLockInOptions([question, standInLockInQ]);
        } else {
          console.log("no lock in required, trying to update");
          // - updates current question
          sendCurrentCallToDB(question);
          // - updates as having been asked
          markAsAskedDB(question);
          setLockInOptions([]);
          setStatus(true)
        
        }
      // - provide options for skipping
    };



const confirmBtnHandler = (question) => {
  console.log("question in confirmBtnHandler", question);
 setAlreadyLockedIn(true); 
askQuestion({question});
};



 
  return (
    <>
      <AskQuestionStyles>
        {status ? "Asked!" : ""}
        <p>{question.requireLockIn ? "Requires Lockin" : "Doesn't require"}</p>
        {requireLockInState ? (
    
          lockInOptions.map((option) => {
            console.log("option", option);

    
            return (
              <div key={option._id}>
                <p>{option.question}</p>
                <button
                  // onClick={() => confirmBtnHandler({option})}
                  onClick={() => confirmBtnHandler(option)}
                  className="lock-in"
                >
                  Lock in ?
                </button>
              </div>
            );
          })
        ) : (
          <>
            {status ? (
              ""
            ) : (
              <button
                onClick={() => askQuestion({ question }, alreadyLockedIn)}
              >
                Ask Question
              </button>
            )}
          </>
        )}
      </AskQuestionStyles>
    </>
  );
};

export default AskQuestion;
