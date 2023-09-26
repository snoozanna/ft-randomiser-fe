// import React from 'react';
// import { gql, useQuery } from '@apollo/client';

// export const GET_ALL_QUESTIONS_QUERY = gql`
//   {
//     allQuestion {
//       _id
//       question
//     }
//   }
// `;
// const Test = () => {
//   const { data, loading, error } = useQuery(GET_ALL_QUESTIONS_QUERY);
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;
//   return <pre>{JSON.stringify(data, null, 4)}</pre>;
// };

// export default Test;
