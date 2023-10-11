import { Link, graphql } from 'gatsby';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { devices } from '../styles/breakpoints.js';
import { QuestionContext } from "../context/questions.context";
import { useQuery } from "@apollo/client";
import GET_ALL_UNASKED_Q from "../queries/GET_ALL_UNASKED_Q.js";
import CurrentQ from "./../components/CurrentQuestion.js"
import SequenceBtn from "../components/Buttons/SequenceBtn.js";
import RapidFireBtn from '../components/Buttons/RapidFireBtn.js';
import NonNegBtn from '../components/Buttons/NonNegBtn.js';
import CallSequence from '../components/CallSequence.js';
import RandomLightBtn from '../components/Buttons/RandomLight.js';
import EndSequenceBtn from '../components/Buttons/EndSequence.js';
import Loader from '../components/Loader/index.js';
import LoadQuestionsBtn from '../components/Buttons/LoadQuestions.js';
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
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
  .btn-container-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    .mini-status {
      border: 2px solid white;
      padding: 1rem;
      width: min-content;
      /* max-width: 10rem; */
      display: flex;
      flex-direction: column;
      text-align: center;
    }
  }
  .btn-container-right {
    display: flex;
    flex-direction: column;
    grid-area: d;
    justify-content: space-around;
    align-items: end;
  }
  .btn-container-lower,
  .callSequence {
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



const RandomiserPage = () => {
     const {
       questionSequence,
       questionSequenceIndex,
       setAllUnaskedQuestions,
     } = useContext(QuestionContext);
       const [lockInMoment, setLockInMoment] = useState(false);

 
      
  
    return (
      <RandomiserPageStyles>
        <div className="btn-container-upper">
          <SequenceBtn levelSequenceLabel={1}  />
          <SequenceBtn levelSequenceLabel={2} />
          <SequenceBtn levelSequenceLabel={3} />
        </div>
        

        <div className="btn-container-left">
          <div className="mini-status">
            <h4>
              <strong>Status</strong>
            </h4>
            <span>
              <p>
                {questionSequence.questions.length === 0
                  ? "Waiting to choose sequence"
                  : `Sequence ${questionSequence.sequenceLevel} loaded!`}
              </p>
              <p>
                {questionSequenceIndex >= 0 &&
                questionSequenceIndex === questionSequence.questions.length - 1
                  ? "Last question"
                  : null}
              </p>
            </span>
          </div>
          <div className="btn-wrapper endsequence">
            <LoadQuestionsBtn/>
        <EndSequenceBtn/>
          </div>
          <div />
        </div>
        <CallSequence
          setLockInMoment={setLockInMoment}
          className="callSequence"
        />
        <div className="current-q-wrapper">
          <CurrentQ
            lockInMoment={lockInMoment}
            setLockInMoment={setLockInMoment}
          />
        </div>
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



// app starts
// call to db for all unasked q
// saved in sattae / context
// build sequence runs from the qeustions in context
// those questions are removed from state
// question are marked as asked as they are clicked go
// pressing a non neg button takes a non neg question from the remaining unasked q saved in state
// that q is amrked as asekd 