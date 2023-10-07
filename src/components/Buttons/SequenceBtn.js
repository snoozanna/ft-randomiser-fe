import React, { useContext } from 'react';
import { QuestionContext } from "../../context/questions.context";
import { buildSequence } from '../../utils/utils';
import { useQuery } from '@apollo/client';
import GET_ALL_UNASKED_Q from '../../queries/GET_ALL_UNASKED_Q';
import Loader from '../Loader';
import levelSequences from '../../utils/constants';

const SequenceBtn = ({ levelSequenceLabel }) => {
  const { setQuestionSequence, setQuestionSequenceIndex } = useContext(QuestionContext);
  const { data, loading, error } = useQuery(GET_ALL_UNASKED_Q);
  if (loading) return <Loader />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <text>Could not find data</text>;
  const { questions } = data;

  const levelSequence = levelSequences[levelSequenceLabel];

  const clickHandler = (questions, sequenceOrder) => {
    const sequence = buildSequence(questions, sequenceOrder);
    setQuestionSequence({
      sequenceLevel: levelSequenceLabel,
      questions: sequence
    });
    setQuestionSequenceIndex(-1);
  };

  return (
    <button
      type="button"
      onClick={() => clickHandler({ questions }, levelSequence)}
    >
      {/* {btnName ? btnName : "Light"} */}
      Sequence {levelSequenceLabel}
    </button>
  );
};

export default SequenceBtn;

