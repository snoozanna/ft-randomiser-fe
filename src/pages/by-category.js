import { Link, graphql, useStaticQuery } from 'gatsby';
import { useQuery, gql } from '@apollo/client';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
// import Query from '../components/Query';
import SEO from '../components/SEO';
import { devices } from '../styles/breakpoints.js';
import Loader from '../components/Loader/index.js';
import { QuestionContext } from '../context/questions.context';
// import Q_BY_CATEGORY_QUERY from '../queries/questByCat';

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

const Q_BY_CATEGORY_QUERY = gql`
  query myQuery {
    allSanityQuestions {
      nodes {
        id
        name
      }
    }
  }
`;

const QByCat = () => {
  const { quest, setQuest, alreadyCalled, setAlreadyCalled } =
    useContext(QuestionContext);
  const [selectedCategory, setSelectedCategory] = useState('Life');
  const { data, loading, error } = useQuery(Q_BY_CATEGORY_QUERY); // <-- just works
  if (loading) return <Loader />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  console.log(data);
  // const [selectedCategory, setSelectedCategory] = useState({ name: 'Life' });
  // // const [category, setCategory] = useState('Life');
  // const catData = useStaticQuery(
  //   graphql`
  //     query QCatQuery($selectedCategory: String) {
  //       questByCat: allSanityQuestion(
  //         # filter: { category: { elemMatch: { name: { eq: $selectedCategory } } } }
  //         filter: {
  //           category: { elemMatch: { name: { eq: $selectedCategory } } }
  //         }
  //       ) {
  //         nodes {
  //           id
  //           question
  //           category {
  //             name
  //           }
  //         }
  //       }
  //       categories: allSanityCategory {
  //         nodes {
  //           id
  //           name
  //         }
  //       }
  //     }
  //   `
  // );

  // const categories = catData.categories.nodes;

  // const handleCategoryClick = (clickedCategory) => {
  //   setSelectedCategory(clickedCategory);
  //   console.log(catData.questByCat);
  // };

  return (
    <>
      <QByCatStyles>
        <header>
          {/* <div className="cat-btn-wrapper">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat.name}
              </button>
            ))}
          </div> */}
        </header>
        {/* <Query query={Q_BY_CATEGORY_QUERY}>
          {({ data: { questions } }) => {
            console.log(questions);
          }}
        </Query> */}
        <p>hi</p>
      </QByCatStyles>
    </>
  );
};

export default QByCat;

// export const query = graphql`
//   query CategoryQuery {
//     categories: allSanityCategories {
//       nodes {
//         id
//         name
//       }
//     }
//   }
// `;
