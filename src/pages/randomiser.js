import { Link, graphql } from 'gatsby';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { devices } from '../styles/breakpoints.js';
import { QuestionContext } from "../context/questions.context";
import { useQuery } from "@apollo/client";
import CurrentQ from "./../components/CurrentQuestion.js"
import SequenceBtn from "../components/Buttons/SequenceBtn.js";
import CallSequence from '../components/CallSequence.js';
import EndSequenceBtn from '../components/Buttons/EndSequence.js';
import Loader from '../components/Loader/index.js';
import mark from "./../assets/images/mark.png";
import progress from "./../assets/images/progress.png";
import tick from "./../assets/images/tick-b.png";
import LoadQuestionsBtn from '../components/Buttons/LoadQuestions.js';
import SingleQuestionBtn from '../components/Buttons/SingleQuestionBtn.js';



const RandomiserPageStyles = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 12% 1fr 15%;
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
    justify-content: space-between;
    align-items: flex-start;
    grid-area: a;
    .mini-status {
      border: 3px solid black;
      border-radius: 5px;
      padding: 1rem;
      width: min-content;
      /* max-width: 10rem; */
      display: flex;
      flex-direction: column;
      text-align: center;
      color: black;
      background: var(--lightgreen);
      h4 {
        margin-bottom: 1rem;
      }
      p {
        line-height: 2rem;
        font-weight: 600;
        span > img {
          max-width: 25px;
          margin-inline-end: 0.5rem;
        }
        span.status-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  .seqBtnWrapper {
    display: flex;
  }
  .load-btn-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: b;
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
       loadAllQuestionsRequired,
     } = useContext(QuestionContext);
       const [lockInMoment, setLockInMoment] = useState(false);


 useEffect(()=> {

 }, [])
      
  
    return (
      <RandomiserPageStyles>
        {loadAllQuestionsRequired ? (
          <div className="load-btn-wrapper">
            <LoadQuestionsBtn />{" "}
          </div>
        ) : (
          <>
            <div className="btn-container-upper">
              <div className="mini-status">
                <h4>
                  <strong>Status</strong>
                </h4>
                <span>
                  <p>
                    {questionSequence.questions.length === 0 ? (
                      "Pick a sequence..."
                    ) : (
                      <span className="status-wrapper">
                        <img src={tick} alt="Tick" />{" "}
                        {questionSequence.label} Sequence loaded!
                      </span>
                    )}
                  </p>

                  <p>
                    {questionSequenceIndex >= 0 ? (
                      <span className="status-wrapper">
                        <img src={progress} alt="progress" /> Sequence Progress:
                        {questionSequenceIndex + 1}/
                        {questionSequence.questions.length}
                      </span>
                    ) : null}
                  </p>

                  <p>
                    {questionSequenceIndex >= 0 &&
                    questionSequenceIndex ===
                      questionSequence.questions.length - 1 ? (
                      <span className="status-wrapper">
                        <img src={mark} alt="mark" /> Last question
                      </span>
                    ) : null}
                  </p>
                </span>
              </div>
              <div className="seqBtnWrapper">
                <SequenceBtn levelSequenceLabel={1} label={"Easy"} />
                <SequenceBtn levelSequenceLabel={2} label={"Medium"} />
                <SequenceBtn levelSequenceLabel={3} label={"Hard"} />
              </div>
              <div />
            </div>

            <div className="btn-container-left">
              <div className="btn-wrapper endsequence">
                <EndSequenceBtn />
              </div>
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
              <div className="btn-wrapper">
                <SingleQuestionBtn buttonType="Rapid Fire" />
              </div>
              <div className="btn-wrapper ">
                <SingleQuestionBtn buttonType="Non Negotiable" />
              </div>
              <div className="btn-wrapper">
                <SingleQuestionBtn buttonType="Random Light" />
              </div>
            </div>
          </>
        )}
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