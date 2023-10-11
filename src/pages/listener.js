import React from "react";
// import useSanityListener from "./../hooks/useSanityListener.js";
// import { createClient } from "@sanity/client";
import { useQuery } from "@apollo/client";
import Loader from "../components/Loader";
import GET_CURRENT_QUESTION from "../queries/GET_CURRENT_QUESTION";
import styled from "styled-components";

const ListenerPageStyles = styled.section`
display: flex;
flex-direction:column;
justify-content: center;
align-items: center;
`
function ListenerPage() {
    const { data, loading, error } = useQuery(GET_CURRENT_QUESTION, {
      pollInterval: 200,
    });
    if (loading) return <Loader />;
    if (error) return <p>Error: {JSON.stringify(error)}</p>;
    if (!data) return <text>Could not find data</text>;

   console.log("listener data", data)
   const {currentQ} = data;
   const {question} = currentQ[0];
    console.log("listener data q ", question);


  return (
    <ListenerPageStyles className="ListenerPage">
    
      <h3 className="question">
        <p>{question.question}</p>
      </h3>
    </ListenerPageStyles>
  );
}

export default ListenerPage;



///  a useEffect which listens for when currentQuestion changes to null
// then sets question in progress to false in db

// in progress marked as true each time current q updated
