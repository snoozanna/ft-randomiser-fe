import React from 'react';

import { useQuery } from '@apollo/client';
import Loader from '../Loader/index';
import { getRandomQ } from '../../utils/utils.js';
import Q_BY_LIGHT from "../../queries/questionsLight.js";

const LightBtn = ({
  allQuestions,
  setCurrentQuestion,
  alreadyCalled,
  setAlreadyCalled,
  btnName,
}) => {
  const { data, loading, error } = useQuery(Q_BY_LIGHT);

  if (loading) return <Loader />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <text>Could not find data</text>;
  // console.log(data);

  const { questions } = data;

  const handleClick = () => {
    getRandomQ({
      questionsToChoose: questions,
      allQuestions,
      setCurrentQuestion,
      alreadyCalled,
      setAlreadyCalled,
    });
  };

  return (
    <button type="button" onClick={() => handleClick()}>
      {btnName ? btnName : "Light"}
    </button>
  );
};

export default LightBtn;
