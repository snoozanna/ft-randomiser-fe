import { Link, useStaticQuery } from 'gatsby';
import { useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import DeepBtn from '../components/DeepBtn.js';
import MediumBtn from '../components/MediumBtn.js';
import LightBtn from '../components/LightBtn.js';

import { getRandomQ } from '../utils/utils.js';
import { QuestionContext } from '../context/questions.context';
// import Q_BY_DEEP from '../queries/questionsDeep.js';

const QByCatStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  header {
    position: fixed;
    top: 3%;
  }
  .cat-btn-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    button {
      margin-inline-end: 2rem;
    }
  }
  .question-wrapper {
    width: 100%;
    margin-block-end: 4rem;
    text-align: center;
    span.question {
      font-size: 4rem;
      font-weight: 600;
    }
  }
`;

const QByLevel = () => {
  const { allQuestions, currentQuestion, setCurrentQuestion, alreadyCalled, setAlreadyCalled } =
    useContext(QuestionContext);
  const [selectedLevel, setSelectedLevel] = useState('Deep');

  return (
    <>
      <QByCatStyles>
        <header>
          <div className="cat-btn-wrapper">
            <LightBtn
            allQuestions={allQuestions}
              setCurrentQuestion={setCurrentQuestion}
              alreadyCalled={alreadyCalled}
              setAlreadyCalled={setAlreadyCalled}
            />
            <MediumBtn
              setCurrentQuestion={setCurrentQuestion}
              alreadyCalled={alreadyCalled}
              setAlreadyCalled={setAlreadyCalled}
            />
            <DeepBtn
              setCurrentQuestion={setCurrentQuestion}
              alreadyCalled={alreadyCalled}
              setAlreadyCalled={setAlreadyCalled}
            />
          </div>
        </header>
        <h3>{currentQuestion.question}</h3>

        {/* <Query query={Q_BY_CATEGORY_QUERY}>
          {({ data: { questions } }) => {
            console.log(questions);
          }}
        </Query> */}
      </QByCatStyles>
    </>
  );
};

export default QByLevel;
