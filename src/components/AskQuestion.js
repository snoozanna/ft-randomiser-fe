import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import {
  updateQuestionBeenAsked,
  sendCurrentCallToDB,
} from "../utils/utils.js";
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
  
 
  return (
    <>
    
      <AskQuestionStyles>
   
      </AskQuestionStyles>
    </>
  );
};

export default AskQuestion;

// returns a button that is either Go, Skip, Single Question
// does api calls
// upon a sucessful response updates state
// thsi means that single questions can be drawn from state rather than an api calll. 

