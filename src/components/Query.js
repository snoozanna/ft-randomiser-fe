import React from 'react';
import { useQuery } from '@apollo/client';
import Loader from './Loader';

const Query = ({ children, query }) => {
  const { data, loading, error } = useQuery(query, {});

  if (loading) return <Loader />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  console.log('data', data);
  return children({ data });
};

export default Query;
