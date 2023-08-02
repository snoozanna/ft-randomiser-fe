import React from 'react';

import { useQuery } from '@apollo/client';
import Loader from './Loader/index';
import { getRandomQ } from '../utils/utils.js';
import Q_BY_MEDIUM from '../queries/questionsMedium.js';

const DeepBtn = ({ setQuest, alreadyCalled, setAlreadyCalled }) => {
  const { data, loading, error } = useQuery(Q_BY_MEDIUM);

  if (loading) return <Loader />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <text>Could not find data</text>;
  // console.log(data);

  const { questions } = data;

  const handleClick = () => {
    getRandomQ({ questions, setQuest, alreadyCalled, setAlreadyCalled });
  };

  return (
    <button type="button" onClick={() => handleClick()}>
      Medium
    </button>
  );
};

export default DeepBtn;
