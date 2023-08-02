import { Link, graphql } from 'gatsby';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import SEO from '../components/SEO';
import { devices } from '../styles/breakpoints.js';

import { QuestionContext } from '../context/questions.context';

const RandomQStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  align-items: center;
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

const RandomQ = ({ data }) => {
  const { quest, setQuest, alreadyCalled, setAlreadyCalled } =
    useContext(QuestionContext);
  const questions = data.questions.nodes;
  const getRandomQ = () => {
    const randomQ = questions[Math.floor(Math.random() * questions.length)];
    // check if already been called

    if (alreadyCalled.includes(randomQ.id)) {
      if (alreadyCalled.length === questions.length) {
        setQuest({ question: 'No more questions left', category: [] });
      } else {
        getRandomQ();
      }
    } else {
      console.log(randomQ);
      setQuest(randomQ);
      if (randomQ.category.length) {
        console.log('has a cat');
      } else {
        console.log('no cat');
      }
      setAlreadyCalled([...alreadyCalled, randomQ.id]);
    }
  };

  return (
    <>
      <RandomQStyles>
        {/* <span className="category">
          {quest.category.length > 0
            ? `Category: ${quest.category[0].name}`
            : ''}
        </span> */}
        <div className="question-wrapper">
          <span className="question">
            {quest.question ? quest.question : ''}
          </span>
        </div>
        <div className="button-wrapper">
          <button type="button" onClick={() => getRandomQ()}>
            Another
          </button>
        </div>
      </RandomQStyles>
    </>
  );
};

export default RandomQ;

export const query = graphql`
  query QuestionQuery {
    questions: allSanityQuestion {
      nodes {
        id
        question
        category {
          name
        }
      }
    }
  }
`;
