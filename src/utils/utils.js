// start up process - retrevie all questions from the database 

// questions that enter this fn in questionsToChoose will be in one of three categories: light, medium, deep
export const getRandomQ = ({
  questionsToChoose,
  allQuestions,
  setCurrentQuestion,
  alreadyCalled,
  setAlreadyCalled,
}) => {
  console.log('questions in getRQ', questionsToChoose);
  
  // choose a random question from questionsToChoose (eg all the light questions)
  const randomQ = questionsToChoose[Math.floor(Math.random() * questionsToChoose.length)];
  console.log('This is the q chosen', randomQ);

  // check if the question has already been called
  if (alreadyCalled.includes(randomQ._id)) {
      // check if we have hit the limit of questions
      //TODO I need it to just check against its own category and log "no more questions in that category"

  // if every single question has been called
    if (alreadyCalled.length === allQuestions.length) {
      console.log('no more q left');

    } else {
      console.log('already chosen, trying again');
      getRandomQ({
        allQuestions,
        setCurrentQuestion,
        alreadyCalled,
        setAlreadyCalled,
      });
    }
  } else {
    console.log('this is the chosen randomQ', randomQ);
    setCurrentQuestion(randomQ);
    setAlreadyCalled([...alreadyCalled, randomQ._id]);
    console.log('alreadyCalled', alreadyCalled);
  }
};

// const checkIfAlreadyCalled = () => {

// }

const sortQByLevel = ({ questions }) => {
  const sequence = [];

  // Sort questions by level (easy < medium < hard)
  const sortedQuestions = questions.sort((a, b) => {
    const levelOrder = { lighthearted: 1, medium: 2, deep: 3  };
    return levelOrder[a.level] - levelOrder[b.level];
  });

  sortedQuestions.forEach((question) => {
    sequence.push(question);

  });
      console.log("sequence", sequence);

};

// Function to shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}


const buildSequence = ({ questions }, sequenceOrder, nonNegNum = 4) => {
  const questionsCopy = questions.map((question) => {
    return { ...question };
  });
  let shuffledQuestions = shuffleArray(questionsCopy);
  const sequence = [];
  const usedCategories = [];
  let nonNegCount = 0;

  sequenceOrder.forEach((level) => {
    const question = shuffledQuestions.find((question) => {
      if (nonNegCount < nonNegNum) {
        return (
          question.level === level &&
          !sequence.includes(question) &&
          !usedCategories.includes(question.category.name) &&
          question.nonNeg === true
        );
      } else {
        return (
          question.level === level &&
          !sequence.includes(question) &&
          !usedCategories.includes(question.category.name)
        );
      }
    });
    if (question === undefined) return "not enough questions";
    if (question.nonNeg) nonNegCount++;
    sequence.push(question);
    usedCategories.push(question.category.name);
  });
  if (sequence.length !== sequenceOrder.length) return "not enough questions";
  return sequence;
};


export default buildSequence

