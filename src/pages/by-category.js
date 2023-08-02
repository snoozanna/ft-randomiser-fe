import { Link, useStaticQuery } from 'gatsby';
import { useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Loader from '../components/Loader/index.js';
import { QuestionContext } from '../context/questions.context';
import QUESTIONS_QUERY from '../queries/questions.js';

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

// const Q_BY_CATEGORY_QUERY = gql`
//   query myQuery {
//     allSanityQuestion {
//       nodes {
//         id
//       }
//     }
//   }
// `;

const QByCat = () => {
  const { quest, setQuest, alreadyCalled, setAlreadyCalled } =
    useContext(QuestionContext);
  const [selectedCategory, setSelectedCategory] = useState('Life');

  const { data, loading, error } = useQuery(QUESTIONS_QUERY);

  if (loading) return <Loader />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <text>Could not find data</text>;
  console.log(data);
  // const [selectedCategory, setSelectedCategory] = useState({ name: 'Life' });
  // // const [category, setCategory] = useState('Life');

  const { categories } = data;

  const handleCategoryClick = (clickedCategory) => {
    // setSelectedCategory(clickedCategory);
    // console.log('data.questByCat', data.questByCat);
    console.log(clickedCategory);
  };

  return (
    <>
      <QByCatStyles>
        <header>
          <div className="cat-btn-wrapper">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat._id}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </header>
        {/* <Query query={Q_BY_CATEGORY_QUERY}>
          {({ data: { questions } }) => {
            console.log(questions);
          }}
        </Query> */}
        {selectedCategory.name}
      </QByCatStyles>
    </>
  );
};

export default QByCat;
