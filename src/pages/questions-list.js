
import React, { useContext } from 'react';
import styled from 'styled-components';
import { devices } from '../styles/breakpoints.js';
import GET_ALL_UNASKED_Q from "./../queries/GET_ALL_UNASKED_Q";
import { markAsAskedDB } from '../utils/utils.js';
import { useQuery } from "@apollo/client";
import Loader from '../components/Loader';

const QuestionListPageStyles = styled.div`
  display: flex;
  flex-direction: column;
  .qcontainer {
    margin-bottom: 2rem;
    display: flex;
  }
  p {
    margin-bottom: 0;
    margin-right: 1rem;
  }
  .label-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  span.label {
    text-align: left;
    padding: 8px;
    border-radius: 10px;
    width: fit-content;
    font-size: 1.2rem;
    font-weight: 400;
    margin-right: 2rem;
  }
  span.category.label {
    background: purple;
  }

  span.level.label {
    background: green;
  }
`;



const UpdateQuestionButton = ({ questionId }) => {

  const handleUpdate = ({questionId}) => {
    markAsAskedDB({questionId});
  };

  return (
    <button onClick={() => handleUpdate({questionId})}>Mark as Asked</button>
  );
};





const QuestionListPage = () => {
  const { data, loading, error } = useQuery(GET_ALL_UNASKED_Q);
  if (loading) return <Loader />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <text>Could not find data</text>;

  const { questions } = data;


  return (
    <QuestionListPageStyles>
      <h2>Unasked Questions</h2>
      {questions.map((question) => {

         return (
             <div className="qcontainer" key={question._id}>
               <p> {question.question}</p>
               <div className="label-container">
                 <span className="category label">
                   {" "}
                   {question.category.name ? (
                     question.category.name
                   ) : (
                     <p>none</p>
                   )}
                 </span>
               </div>
               <UpdateQuestionButton questionId={question._id} />
             </div>
 
         );
      })}
    </QuestionListPageStyles>
  );
};

export default QuestionListPage;

// export const query = graphql`
//   query QuestionListQuery {
//     questions: allSanityQuestion {
//       nodes {
//         id
//         question
//         category {
//           id
//           name
//         }
//       }
//     }
//   }
// `;
