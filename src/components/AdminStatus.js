import React, { useContext, useEffect, useState } from "react";
import {QuestionContext} from "../context/questions.context";
import styled from "styled-components";
import mark from "../assets/images/mark.png";

const AdminStatusStyles = styled.div`
  .mini-status {
    grid-area: f;
    border: 3px solid black;
    border-radius: 5px;
    padding: 1rem;
    /* width: min-content; */
    height: fit-content;
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
      &.alert{
        color: red;
      }
    }
    p.resetRequired {
      background: var(--red);
      padding: 0.5rem;
      border: 3px solid black;
      border-radius: 5px;
    }
  }
`;

const AdminStatus = () => {
  const { allUnaskedQuestions, resetRequired, setResetRequired } =
    useContext(QuestionContext);
  const [levelCounts, setLevelCounts] = useState("")
  const [nonNegCounts, setNonNegCounts] = useState("");
   const [categoryCountsState, setCategoryCountsState] = useState("");
  console.log("nonNegCounts state", nonNegCounts[true]);

   const countQuestionsByCategory = (questions) => {
     const categoryCounts = {};
     questions.forEach((question) => {
       const category = question.category.name;
       if (categoryCounts[category]) {
         categoryCounts[category]++;
       } else {
         categoryCounts[category] = 1;
       }
     });
     console.log("categoryCounts", categoryCounts);
     setCategoryCountsState(categoryCounts);
     return categoryCounts;
   };
   const countQuestionsByLevel = (questions) => {
     const levelCounts = {};
     questions.forEach((question) => {
       const level = question.level;
       if (levelCounts[level]) {
         levelCounts[level]++;
       } else {
         levelCounts[level] = 1;
       }
     });
    //  console.log("levelCounts", levelCounts);
     setLevelCounts(levelCounts);
     return levelCounts;
   };

   const countQuestionsByNonNeg = (questions) => {
     const nonNegCounts = {};
     questions.forEach((question) => {
       const nonNeg = question.nonNeg;
       if (nonNegCounts[nonNeg]) {
         nonNegCounts[nonNeg]++;
       } else {
         nonNegCounts[nonNeg] = 1;
       }
     });
     console.log("nonNegCounts", nonNegCounts);
     setNonNegCounts(nonNegCounts);
     return nonNegCounts;
   };

   useEffect(() => {
     const categoryCounts = countQuestionsByCategory(allUnaskedQuestions);

     const levelCounts = countQuestionsByLevel(allUnaskedQuestions);

     const nonNegCounts = countQuestionsByNonNeg(allUnaskedQuestions);
    
   }, [allUnaskedQuestions]);   

// const keys = Object.keys(categoryCounts)
// const next = keys.forEach((category) => {
//   console.log(category, categoryCounts[category]);
// })
// console.log(keys)


  
  return (
    <AdminStatusStyles>
      <div className="mini-status">
        <h4>
          <strong>Questions Status</strong>
        </h4>
        <p>Unasked questions: {allUnaskedQuestions.length}</p>
        <p className={`${nonNegCounts[true] <= 20 ? "alert" : ""}`}>
          Non negotiable questions: {nonNegCounts[true]}
        </p>
       
       {resetRequired ? (
          <p className="resetRequired">
            <span className="status-wrapper">
              <img src={mark} alt="mark" />
              RESET REQUIRED!
            </span>
          </p>
        ) : null}
        {/* </span> */}
      </div>
    </AdminStatusStyles>
  );
}

export default AdminStatus;
