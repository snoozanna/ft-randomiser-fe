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
}


const buildSequence = ({ questions }) => {
  console.log("building sequence");
  const sequence = [];
  const usedQuestionIds = new Set(); // To track used question IDs
  
  // Define the sequence order
  const sequenceOrder = ["deep", "lighthearted", "deep", "deep", "medium", "lighthearted"];
  
  // Create a map to track the number of questions added for each level
  const addedCounts = {};
  sequenceOrder.forEach((level) => {
    addedCounts[level] = 0;
  });

  // Iterate through sequenceOrder and questions to build the sequence
  sequenceOrder.forEach((level) => {
    const matchingQuestions = questions.filter((question) => question.level === level);
    // console.log(`matching Q for ${level}`, matchingQuestions)

    if (matchingQuestions.length) {
      // Shuffle the questions for this level
      shuffleArray(matchingQuestions);
      // pick a random questions from matchingQuestions
       let randomIndex = Math.floor(Math.random() * (matchingQuestions.length));
      let nextQuestion = matchingQuestions[randomIndex];
      console.log("nextQuestion.question", nextQuestion.question)
      // Check if the question ID is already used in the sequence
      if (!usedQuestionIds.has(nextQuestion.id)) {
        sequence.push(nextQuestion);
        addedCounts[level]++;
        usedQuestionIds.add(nextQuestion.id); // Mark the question as used
      } else {
        console.log(`Duplicate question with ID '${nextQuestion.id}' found for level '${level}'. Question is ${nextQuestion.question}`);
        // TODO Need to try to pull another question 
         randomIndex = Math.floor(Math.random() * (matchingQuestions.length));
        nextQuestion = matchingQuestions[randomIndex];
      console.log("nextQuestion.question in else", nextQuestion.question)
      // Check if the question ID is already used in the sequence
       if (!usedQuestionIds.has(nextQuestion.id)) {
        sequence.push(nextQuestion);
        addedCounts[level]++;
        usedQuestionIds.add(nextQuestion.id); // Mark the question as used
      } else{
        console.log("not sure how to stop going round in circles")
      }
        return
      }
     
    } else {
      console.log(`No more questions of level '${level}' left.`);
    }

  });
       console.log("addedCounts", addedCounts)
  return sequence;
};


export default buildSequence