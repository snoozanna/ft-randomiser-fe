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
}

span.level.label{
  background: green;
}
`

const Sequence = ({sequence}) => {

  return(
  sequence.map((question)=> {

return(
      <SequenceStyles>
    <div className='label-container'>
      <span className="category label">{question.category.name}</span>
      <span className="level label">{question.level}</span>
    </div>
    <p key={question.id}>{question.question}</p>

    </SequenceStyles>
  )
}
  )
  )
    
}


export default Sequence