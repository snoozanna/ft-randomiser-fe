import React, { useContext, useEffect, useState } from "react";
// import useSanityListener from "./../hooks/useSanityListener.js";
import {graphql} from "gatsby"
import { createClient } from "@sanity/client";
import { useLazyQuery, useQuery } from "@apollo/client";
import Loader from "../components/Loader";
import GET_CURRENT_QUESTION from "../queries/GET_CURRENT_QUESTION";
import styled from "styled-components";
import client from "../gatsby-plugin-apollo/client";
import QuestionContext from "../context/questions.context";
// const sanityClient = require("@sanity/client");

const ListenerPageStyles = styled.section`
display: flex;
flex-direction:column;
justify-content: center;
align-items: center;
`
function ListenerPage( {data} ) {
const [questionInProgressState, setQuestionInProgressState] = useState(
  data.current.nodes[0].questionInProgress,
);
const [questionToDisplay, setQuestionToDisplay] = useState(null)
// const [currentQIDFromListener, setCurrentQIDFromListener] = useState("")

  //   const [getCurrentQuestion, { data, loading, error }] = useLazyQuery(
  //     GET_CURRENT_QUESTION,
  //     {
  //       fetchPolicy: "network-only",
  //       // pollInterval: 1000,
  //     },
  //   );
  //   if (loading) return <Loader />;
  //   if (error) return <p>Error: {JSON.stringify(error)}</p>;
  //   // if (!data) return <text>Could not find data</text>;
  //   if(data){
  //     console.log("data", data)
  //  const {currentQ} = data;
  //  const {question} = currentQ[0];
  //   }

console.log(data)
const allQuestions = data.questions.nodes;
const questionInProgress = data.current.nodes[0].questionInProgress;
const qFromDBAtStart = data.current.nodes[0].question.question;


  // Listen for changes with Sanity Client Listening 
    const sanityClient = createClient({
      projectId: "vlp0qz8p",
      dataset: "production",
      apiVersion: "v2023-08-01",
      useCdn: false, // `false` if you want to ensure fresh data
    });

  const query = `*[_type == "currentQ"]`;
  const params = { _id: "82513c32-16c5-4ed1-9e16-ab1ca76da0a5" };

useEffect(() => {
  console.log("useEffect fires")
 const subscription = sanityClient
    .listen(query, params)
    .subscribe((update) => {
       console.log("begin");
      const question = update.result;
      const newID = question.question._ref;
      const inProgress = question.questionInProgress;
      console.log("subscribing", question);
      const newQuestion = allQuestions.find((q)=> {return q._id === newID})
      setQuestionInProgressState(inProgress)
      setQuestionToDisplay(newQuestion);
     
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
      {questionInProgressState ? (
        <h3 className="question">

          <p>
            {questionToDisplay ? questionToDisplay.question : qFromDBAtStart}
          </p>
        </h3>
      ) : (
        <p> Nothing to see here</p>
      )}

      {/* {currentQIDFromListener} */}
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
