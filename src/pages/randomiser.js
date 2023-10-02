import { Link, graphql } from 'gatsby';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { devices } from '../styles/breakpoints.js';
import { QuestionContext } from "../context/questions.context";
import CurrentQ from "./../components/CurrentQuestion.js"
import LightBtn from '../components/Buttons/LightBtn.js';
import MediumBtn from "../components/Buttons/MediumBtn.js";
import DeepBtn from '../components/Buttons/DeepBtn.js';
import LockInBtn from '../components/Buttons/LockInBtn.js';
import SkipBtn from "../components/Buttons/SkipBtn.js";
import GoBtn from '../components/Buttons/GoBtn.js';
import RapidFireBtn from '../components/Buttons/RapidFireBtn.js';
import NonNegBtn from '../components/Buttons/NonNegBtn.js';
import RandomLightBtn from '../components/Buttons/RandomLight.js';


const RandomiserPageStyles = styled.section`
  /* padding: clamp(5px, 5vw, 25px); */
  /* min-height: 70vh; */

  /* display: flex; */
  /* flex-direction: row-reverse;
  justify-content: space-between; */
  /* align-items: center; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "a a a a"
    "b b b b"
    "c c c c"
    "d d d d";
  max-width: 100%;

  /* gap: 2rem; */

  .current-q-wrapper {
    grid-column-start: b;
    grid-column-end: b;
  }
  .btn-container-left{
display:flex;
flex-direction:column ;
  } 
  @media ${devices.mobileL} {
    grid-template-columns: repeat(3, minmax(50px, 1fr));
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "a a ."
      "a a b"
      ". e d";
    gap: 2rem;
  }
`;

const LevelBtnWrapperStyles = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items:center;
grid-area: a;
`

const RandomiserPage = () => {
     const {
       allQuestions,
       currentQuestion,
       setCurrentQuestion,
       alreadyCalled,
       setAlreadyCalled,
     } = useContext(QuestionContext);
    return (
      <RandomiserPageStyles>
        <LevelBtnWrapperStyles>
          <LightBtn
            allQuestions={allQuestions}
            setCurrentQuestion={setCurrentQuestion}
            alreadyCalled={alreadyCalled}
            setAlreadyCalled={setAlreadyCalled}
          />
          <MediumBtn
            setCurrentQuestion={setCurrentQuestion}
            alreadyCalled={alreadyCalled}
            setAlreadyCalled={setAlreadyCalled}
          />
          <DeepBtn
            setCurrentQuestion={setCurrentQuestion}
            alreadyCalled={alreadyCalled}
            setAlreadyCalled={setAlreadyCalled}
          />
        </LevelBtnWrapperStyles>

        <div className="btn-container-left">
          <div className="btn-wrapper lockin">
            <LockInBtn />
          </div>
          <div className="btn-wrapper skip">
            <SkipBtn />
          </div>
          <div className="btn-wrapper go">
            <GoBtn />
          </div>
        </div>
        <CurrentQ />
        <div className="btn-container-right">
          <div className="btn-wrapper lockin">
            <RapidFireBtn />
          </div>
          <div className="btn-wrapper skip">
            <NonNegBtn />
          </div>
          <div className="btn-wrapper go">
            <RandomLightBtn />
          </div>
        </div>
      </RandomiserPageStyles>
    );
}



export default RandomiserPage;

// export const query = graphql``;
