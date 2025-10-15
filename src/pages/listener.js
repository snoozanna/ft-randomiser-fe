import React, { useContext, useEffect, useState } from "react";
// import useSanityListener from "./../hooks/useSanityListener.js";
import {graphql} from "gatsby"
import { createClient } from "@sanity/client";
import styled from "styled-components";
// const sanityClient = require("@sanity/client");
import glowlogo from "./../assets/images/logo-glow.png"
import { fetchQuestion } from "../utils/utils";

const ListenerPageStyles = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: black;
  width: 100%;
  color: var(--orange);
  .listener-question-container {
    /* border: solid 2px white; */
    width: 70vw;
    /* max-width: 60%;*/
    max-width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    height: 35vh;

    .glow-logo-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .glow-logo-wrapper > img {
      max-width: 50%;
    }
    p {
      margin-bottom: 0;
      text-align: center;
      text-wrap: pretty;
      line-height: 4rem;
    }

    .neon {
      color: var(--clr-blue-neon);
      color: var(--clr-neon);
      color: white;

      /* color: var(--orange); */
      padding: 0.25em 0.5em;
      text-shadow:
        0 0 0.125em hsl(0 0% 100% / 0.3),
        0 0 0.45em currentColor;
      position: relative;
    }
    h3.question.show > p.normalFont {
      font-size: 7.5rem;
    line-height: 8rem;
    letter-spacing: 0.4rem;
    }
    h3.question.show > p.smallerFont {
      font-size: 5.5rem;
      line-height: 8rem;
    }
    /* h3.question.show > p.bacFontSize {
      font-size: 5rem;
      line-height: 7rem;
      letter-spacing: 0.4rem;
    } */
  }
`;
function ListenerPage( {data} ) {
const [questionInProgressState, setQuestionInProgressState] = useState(
  data.current.nodes[0].questionInProgress,
);
const [questionToDisplay, setQuestionToDisplay] = useState(null)
const [blankListenerScreen, setBlankListenerScreen] = useState(false);

// console.log(data)



  // Listen for changes with Sanity Client Listening 
    const sanityClient = createClient({
      projectId: "vlp0qz8p",
      dataset: "production",
      apiVersion: "v2023-08-01",
      useCdn: false, // `false` if you want to ensure fresh data
    });

  const query = `*[_type == "currentQ"]`;
  const params = { _id: "ef3a8433-7b3b-4e40-8da0-ed060b7680dd" };

useEffect(() => {
 const subscription = sanityClient
    .listen(query, params)
    .subscribe((update) => {

      const question = update.result;
      const newID = question.question._ref;
      const inProgress = question.questionInProgress;
      const blankListenerScreenToggle = question.blankListenerScreen;
      // console.log("subscribing", question);
      console.log("subscribing", blankListenerScreen);
       setQuestionToDisplay(null);
//fetch the question from the db 
// TODO THIS DOES CAUSE A LITTLE FLASH
    sanityClient.getDocument(newID).then((question) => {
     
        console.log(
          `getting doc from db ${question.question} (${question.altQuestion}`,
        );
     setQuestionToDisplay(question);
      });
      // const newQuestion = allQuestions.find((q)=> {return q._id === newID})
      setQuestionInProgressState(inProgress)
      setBlankListenerScreen(blankListenerScreenToggle);
     
     
    });

  return () => {
    subscription.unsubscribe();
  };
}, [sanityClient]);
  

  // to unsubscribe later on
  // subscription.unsubscribe();
// console.log("hello")



  return (
    <ListenerPageStyles className="ListenerPage">
      <div className="listener-question-container">
        {questionInProgressState ? (
          <h3 className="question show">
            {questionToDisplay ? <p
              className={`${
                questionToDisplay.question.length >= 120
                  ? "smallerFont"
                  : "normalFont"
              } neon`}
              // {questionToDisplay ? <p
              // className={`bacFontSize neon`}
            > 
              {/* If the Blank Screen button is pressed, hide the current question */}
              {blankListenerScreen
                ? ""
                : `${questionToDisplay ? questionToDisplay.question : ""}`}
            </p>
            : ""}
          </h3>
        ) : (
          <div className="glow-logo-wrapper">
            <img src={glowlogo} />
          </div>
        )}

        {/* {currentQIDFromListener} */}
      </div>
    </ListenerPageStyles>
  );
}

export default ListenerPage;



///  a useEffect which listens for when currentQuestion changes to null
// then sets question in progress to false in db

// in progress marked as true each time current q updated


export const query = graphql`
  query QuestionQuery {
    questions: allSanityQuestion {
      nodes {
        _id
        question
        level
        category {
          name
          _id
        }
        requireLockIn
        nonNeg
        documentary
      }
    }
    current: allSanityCurrentQ {
      nodes {
        question {
          question
        }
        questionInProgress
      }
    }
  }
`;
