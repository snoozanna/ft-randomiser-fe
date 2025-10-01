import { Link, graphql } from 'gatsby';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { devices } from '../styles/breakpoints.js';
import { QuestionContext } from '../context/questions.context';
import { markAllQuestionsAsUnasked, markAllRapidFireAsUnasked, updateCurrentQuestionNotInProgress, markAllRelevantQuestionsAsUnasked } from '../utils/utils.js';
import mark from "./../assets/images/mark.png";
import AdminStatus from '../components/AdminStatus.js';

const AdminPageStyles = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* height: 100%; */
  width: 100%;
  align-items: center;
  button.loading {
    background: red;
  }
 
  .resetContainer{
    display:flex;
    flex-direction:column;
    align-items:start;
    gap: 2rem
  }
`;



const AdminPage = () => {
  const {
    setQuestionSequenceIndex,
    setQuestionSequence,
    allUnaskedQuestions,
    setAllUnaskedQuestions,
    currentQuestion,
    setCurrentQuestion,
    setLoadAllQuestionsRequired,
    setNonNegResetRequired,
    questionSequenceIndex,
    questionSequence, 
    setRelevantResetRequired
  } = useContext(QuestionContext);
const [currentSequence, setCurrentSequence] = useState([])
const [isLoading, setIsLoading] = useState(false)

 useEffect(() => {
   // console.log("useEffect fires")
   if (currentQuestion === null) {
     console.log("tying to update current Q iin useEffect");
     updateCurrentQuestionNotInProgress();
   }
 }, [currentQuestion]);

const fullReset = async () => {
  setIsLoading(true)
  await markAllQuestionsAsUnasked()
  await markAllRapidFireAsUnasked();
  setQuestionSequenceIndex(-1);
  setQuestionSequence({
    sequenceLevel: null,
    questions: [],
  });
  setAllUnaskedQuestions([])
  setCurrentQuestion(null);
  setLoadAllQuestionsRequired(true);
  setNonNegResetRequired(false);
  setIsLoading(false);
  window.location.reload();
}

  const clickHandler = () => {
  if (window.confirm("This will set all questions to unasked. Are you sure?")) {
          fullReset();
        } else {
          console.log("no thanks");
        }
  }

  const clickHandlerRelevant = () => {
    if (window.confirm("This will set all relevant questions to unasked. Are you sure?")) { resetRelevantAndReload();
          } else {
            console.log("no thanks");
          }
    }

 const resetRelevantAndReload = async() => {
  console.log("in resetRelevantAndReload")
  setIsLoading(true)
  await markAllRelevantQuestionsAsUnasked();
  setLoadAllQuestionsRequired(true);
  setRelevantResetRequired(false);
  setIsLoading(false);
  window.location.reload();
  //update state will happen in reload button
 }


  return (
    <>
      <AdminPageStyles>
        <AdminStatus/>
        <div className="resetContainer">
        
          {isLoading ? (
            "Reset in progress"
          ) : (
           <>
           <div>
             <h3>Full Reset</h3>
             <p>This will mark all questions as unasked.</p>
                <button onClick={clickHandler}>Reset</button>
           </div>
             <h3>Reset just relevant</h3>
             <p>This will mark all "relevant" questions as unasked.</p>
              <button onClick={clickHandlerRelevant}>Reset Relevant</button>
           </>
         
          )}
        </div>
      </AdminPageStyles>
    </>
  );
};

export default AdminPage;


