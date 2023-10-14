import { Link, graphql } from 'gatsby';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { devices } from '../styles/breakpoints.js';
import {buildSequence} from "./../utils/utils.js"
import Sequence from '../components/Sequence.js';
import CallSequence from '../components/CallSequence.js';
import { QuestionContext } from '../context/questions.context';
import { Call } from '@mui/icons-material';

const AdminPageStyles = styled.div`
padding: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* height: 100%; */
  width:100%;
  align-items: center;
  
`;



const AdminPage = () => {
  const { currentQuestion, setCurrentQuestion, alreadyCalled, setAlreadyCalled } = useContext(QuestionContext);
const [currentSequence, setCurrentSequence] = useState([])


  const clickHandler = () => {
 
  }


  return (
    <>
      <AdminPageStyles>

     </AdminPageStyles>
    </>
  );
};

export default AdminPage;


