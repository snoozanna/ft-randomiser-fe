import React from 'react';
import styled from 'styled-components';


const SequenceStyles = styled.div`
display:flex;
flex-direction:column;
 margin-bottom:2rem;
p{
  margin-bottom:0;
  text-align:left;
}

.label-container{
  display:flex;
  margin-left:-3rem;
}
span.label{
  text-align:left;
  padding: 8px;
  border-radius: 10px;
  width: fit-content;
  font-size:1.2rem;
  font-weight:400;
    margin-right:2rem;

}
span.category.label{
  background: purple;
  color:white;
}

span.level.label.deep{
  background: #a15526;
}
span.level.label.lighthearted{
  background: #308b30;
}
span.level.label.medium{
  background: #249faf;
}
`

const Sequence = ({sequence}) => {

  return(
<>
<h3>Sequence</h3>
 {sequence.map((question)=> {
      return (
        <SequenceStyles key={question._id}>
        
          <div className="label-container">
            <span className="category label">{question.category.name}</span>
            <span className={`level label ${question.level}`}>{question.level}</span>
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