import React from 'react';
import styled from 'styled-components';


const SequenceStyles = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  p {
    margin-bottom: 0;
    text-align: left;
  }

  .label-container {
    display: flex;
    margin-left: -3rem;
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
    background: rgb(128 0 128 / 32%);
    color: white;
  }

  span.level.label.deep {
    background: #b56ac5b3;
  }
  span.level.label.lighthearted {
    background: hsl(120deg 27.26% 66.82%);
  }
  span.level.label.medium {
    background: #5498cc8a;
  }

  span.level.label.nonNeg {
    background: #00000057;
    color: white;
  }
  span.level.label.later {
    background: green;
    color: white;
  }
`;

const Sequence = ({sequence}) => {

  return(
<>
<h3>Sequence</h3>
 {sequence.map((question)=> {
      return (
        <SequenceStyles key={question._id}>
          <div className="label-container">
            <span className="category label">{question.category.name}</span>
            <span className={`level label ${question.level}`}>
              {question.level}
            </span>
            {question.nonNeg ? (
              <span className={`level label nonNeg`}>Non neg</span>
            ) : (
              ""
            )}
            {question.needToComeLater ? (
              <span className={`level label later`}>Later</span>
            ) : (
              <span className={`level label `}>Anytime</span>
            )}
          </div>
          <p key={question._id}>{question.question}</p>
        </SequenceStyles>
      );
}
  )}
</>
 
  )
    
}


export default Sequence