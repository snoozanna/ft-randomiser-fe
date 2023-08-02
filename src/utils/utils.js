export const getRandomQ = ({
  questions,
  setQuest,
  alreadyCalled,
  setAlreadyCalled,
}) => {
  console.log('questions in getRQ', questions);
  const randomQ = questions[Math.floor(Math.random() * questions.length)];
  console.log('This is the q chosen', randomQ);
  // check if already been called

  if (alreadyCalled.includes(randomQ._id)) {
    if (alreadyCalled.length === questions.length) {
      // setQuest({ question: 'No more questions left' });
      console.log('no more q left');
    } else {
      console.log('already chosen, trying again');
      getRandomQ({
        questions,
        setQuest,
        alreadyCalled,
        setAlreadyCalled,
      });
    }
  } else {
    console.log('this is the chosen randomQ', randomQ);
    setQuest(randomQ);
    // if (randomQ.category.length) {
    //   console.log('has a cat');
    // } else {
    //   console.log('no cat');
    // }
    setAlreadyCalled([...alreadyCalled, randomQ._id]);
    // setAlreadyCalled('yes');
    console.log('alreadyCalled', alreadyCalled);
  }
};
