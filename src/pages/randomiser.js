import { Link, graphql } from 'gatsby';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { devices } from '../styles/breakpoints.js';
import { QuestionContext } from "../context/questions.context";
import CurrentQ from "./../components/CurrentQuestion.js"
import SequenceBtn from "../components/Buttons/SequenceBtn.js";

import LockInBtn from '../components/Buttons/LockInBtn.js';
import SkipBtn from "../components/Buttons/SkipBtn.js";
import GoBtn from '../components/Buttons/GoBtn.js';
import RapidFireBtn from '../components/Buttons/RapidFireBtn.js';
import NonNegBtn from '../components/Buttons/NonNegBtn.js';
import CallSequence from '../components/CallSequence.js';
// import RandomLightBtn from '../components/Buttons/RandomLight.js';


const RandomiserPageStyles = styled.section`
  /* padding: clamp(5px, 5vw, 25px); */
  /* min-height: 70vh; */

  /* display: flex; */
  /* flex-direction: row-reverse;
  justify-content: space-between; */
  /* align-items: center; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 5% 1fr 10%;
  grid-template-areas:
    "a a a a"
    "e b b d"
    ". c c d";
  width: 100%;

  /* gap: 2rem; */

  .current-q-wrapper {
 
    grid-area: b;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .btn-container-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .mini-status{
      border:2px solid white;
      padding: 1rem;
      width:fit-content;
      max-width: 10rem;
      display:flex;
      flex-direction:column;

    }
  }
  .btn-container-right {
    display: flex;
    flex-direction: column;
    grid-area: d;
    justify-content: space-around;
    align-items: end;
  }
  .btn-container-lower {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    grid-area: c;
    align-items: flex-end;
  }
  .btn-container-upper {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    grid-area: a;
  }

  @media ${devices.mobileL} {
    grid-template-columns: repeat(3, minmax(50px, 1fr));
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "a a a"
      "b b b"
      ". e d";
    gap: 2rem;
  }
`;

// const LevelBtnWrapperStyles = styled.div`
// width: 100%;
// display: flex;
// justify-content: center;
// align-items:center;
// grid-area: a;
// `

const RandomiserPage = () => {
     const {questionSequence} = useContext(QuestionContext);
    return (
      <RandomiserPageStyles>
        <div className="btn-container-upper">
          <SequenceBtn levelSequenceLabel={1} />
          <SequenceBtn levelSequenceLabel={2} />
          <SequenceBtn levelSequenceLabel={3} />
        </div>

        <div className="btn-container-left">
          <div className="mini-status">
            <strong>Status</strong>
            <span>eg Sequence {questionSequence.sequenceLevel} loaded!</span>
          </div>
          {/* <div className="btn-wrapper lockin">
            <LockInBtn />
          </div> */}
          <div />
        </div>
        <div className="current-q-wrapper">
          <CallSequence/>
          <CurrentQ />
        </div>
        <div className="btn-container-right">
          <div className="btn-wrapper lockin">
            <RapidFireBtn />
          </div>
          <div className="btn-wrapper skip">
            <NonNegBtn />
          </div>
          <div className="btn-wrapper go">
            {/* <RandomLightBtn
              allQuestions={allQuestions}
              setCurrentQuestion={setCurrentQuestion}
              alreadyCalled={alreadyCalled}
              setAlreadyCalled={setAlreadyCalled}
            /> */}
          </div>
        </div>
       
      </RandomiserPageStyles>
    );
}



export default RandomiserPage;

// export const query = graphql``;
