// const fs = require("fs");
// const csv = require("csv-parser"); 


// start up process - retrevie all questions from the database

// questions that enter this fn in questionsToChoose will be in one of three categories: light, medium, deep
exports.getRandomQ = ({
  questionsToChoose,
  allQuestions,
  setCurrentQuestion,
  alreadyCalled,
  setAlreadyCalled,
}) => {
  console.log("alreadyCalled", alreadyCalled);

  // choose a random question from questionsToChoose (eg all the light questions)
  const randomQ =
    questionsToChoose[Math.floor(Math.random() * questionsToChoose.length)];
  // console.log("This is the q chosen", randomQ);

  // check if the question has already been called
  if (alreadyCalled.includes(randomQ._id)) {
    // check if we have hit the limit of questions
    //TODO I need it to just check against its own category and log "no more questions in that category"

    // if every single question has been called
    if (alreadyCalled.length === allQuestions.length) {
      console.log("no more q left");
    } else {
      console.log("already chosen, trying again");
      getRandomQ({
        allQuestions,
        setCurrentQuestion,
        alreadyCalled,
        setAlreadyCalled,
      });
    }
  } else {
    // console.log("this is the chosen randomQ", randomQ);
    setCurrentQuestion(randomQ);
    setAlreadyCalled([...alreadyCalled, randomQ._id]);
    console.log("alreadyCalled", alreadyCalled);
  }
};

exports.sortQByLevel = ({ questions }) => {
  const sequence = [];

  // Sort questions by level (easy < medium < hard)
  const sortedQuestions = questions.sort((a, b) => {
    const levelOrder = { lighthearted: 1, medium: 2, deep: 3 };
    return levelOrder[a.level] - levelOrder[b.level];
  });

  sortedQuestions.forEach((question) => {
    sequence.push(question);
  });
  // console.log("sequence", sequence);
};

// Function to shuffle an array using the Fisher-Yates algorithm
exports.shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


// put this back in to show sequences on sequence page 
// TODO add needToComeLater
exports.buildSequence = ({questions}, sequenceOrder, nonNegNum = 2) => {
  // Function to shuffle an array using the Fisher-Yates algorithm
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const questionsCopy = questions.map((question) => {
    return { ...question };
  });
  let shuffledQuestions = shuffleArray(questionsCopy);

  for (let i = 0; i < 150; i++) {
    //make an array of nonNegIndexes
    const arrayOfIndexes = [];
    for (let i = 0; i < sequenceOrder.length; i++) {
      arrayOfIndexes.push(i);
    }
    const randomisedIndexes = shuffleArray(arrayOfIndexes);
    const nonNegNumOfRandomisedIndexes = randomisedIndexes.slice(0, nonNegNum);
    const sequence = [];
    sequenceOrder.forEach((level, index) => {
      // console.log("index", index)
      const chosenQuestion = shuffledQuestions.find((question) => {
        const isQuestionPickedAlready = sequence.includes(question);
        if (nonNegNumOfRandomisedIndexes.includes(index)) {
          return (
            question.level === level.level &&
            !isQuestionPickedAlready &&
            question.nonNeg == level.nonNeg
          );
        } else {
          return (
            question.level === level.level &&
            !isQuestionPickedAlready &&
            question.nonNeg == level.nonNeg
          );
        }
      });
      sequence.push(chosenQuestion);
    });

    if (!sequence.includes(undefined)) {
      const listOfCategories = sequence.map((question) => question.category);
      const listOfUniqueCategories = new Set(listOfCategories);
      const arrayOfUniqueCategories = [...listOfUniqueCategories];
      if (
        arrayOfUniqueCategories.length >= 5 ||
        arrayOfUniqueCategories.length > sequenceOrder.length / 2
      ) {
        return sequence;
      }
    }
  }

  return "not enough questions";
};




// exports.sortData = () => {
//   // Define a mapping of category IDs to their names
//   const categoryMapping = {
//     "09704acd-f205-4afd-807d-692f8e513840": "Love & Relationships",
//     "0144753f-3590-4091-bfeb-7433d137e5ba": "Cultural Background & Family or Personal History",
//     "3e87b2c3-3314-44ae-9126-fccd8f27b1eb": "Health & Fertility",
//     "d7afa659-277e-47f5-8d8a-3e12a53ca5d7": "Work & Ambition",
//     "ccdac514-519c-4c2c-b9e6-643688ac73ba": "Humour",
//     "c76b8c70-efce-4474-832a-6c3cccb6550e": "Life & Ethics",
//     "9c219554-49de-4a99-8c14-86ea62a84c41": "Literature or Cultural",
//     "7de96aae-e318-4718-bfa1-c7ecfeaa47f0": "Communication",
//     "50647b88-b49d-48c2-899f-01ec6f1ad77e": "Philosophical & Spiritual",
//     "e0a0a70c-aaba-4a57-a0dc-dcc0bf98dfbb": "Family & personal History",
//     "39a95767-630b-44f9-8d08-67ae64c6ab35": "Social practice & dependability",
//     "36f6dee9-9426-42fb-a922-792c87db2e1e": "Material Possessions & Finance",
//      "d2886006-d0b3-4e77-abc9-b263ba51e79e": "Personal Views",
//   };

//   // Create an array to store the ndJSON data
//   const ndjsonData = [];

//   // Read the CSV file and convert it to ndJSON
//   fs.createReadStream("input.csv")
//     .pipe(csv())
//     .on("data", (row) => {
//       const categoryId = row.category;

//       const ndjsonItem = {
//         _type: "question",
//         // _type: "rapidFire",
//         category: {
//           _ref: categoryId,
//           _type: "reference",
//         },
//         documentary: row.documentary === "TRUE",
//         level: row.level.toLowerCase(),
//         nonNeg: row.nonNeg === "TRUE",
//         question: row.question,
//         followUp: row.followUp,
//         altQuestion: row.altQuestion,
//         needToComeLater: row.needToComeLater === "TRUE",
//         requireLockIn: row.requireLockIn === "TRUE",
//         beenAsked: row.beenAsked === "TRUE",
//       };
//       ndjsonData.push(JSON.stringify(ndjsonItem));
//     })
//     .on("end", () => {
//       // Write the ndJSON data to a file
//       fs.writeFileSync("../../output.ndjson", ndjsonData.join("\n"));
//       console.log("Conversion completed.");
//     });
// };

// // sortData();


exports.updateQuestionBeenAsked = async (questionToUpdate, setTo=true ) => {
    console.log("questionToUpdate in updateQuestionBeenAsked", questionToUpdate);
     if (!questionToUpdate.question) {
       console.log("Not a valid question.");
       return;
     }
  const { _id: newQuestionID } = questionToUpdate;

  console.log(`trying to update as ${setTo}:`, newQuestionID);
  try {
    // Define the mutation object
    const mutation = {
      patch: {
        id: newQuestionID, // Use the provided questionId
        set: {
          beenAsked: setTo,
        },
      },
    };

    // Send the mutation using fetch
    const apiUrl = `${process.env.GATSBY_MUTATE_SANITY_API_URL}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GATSBY_SANITY_TOKEN}`,
      },
      body: JSON.stringify({ mutations: [mutation] }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`Document updated (Marked as ${setTo ? "asked": "not asked"}):`, result);
    } else {
      console.error("Failed to update document:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating document:", error);
  }
};



exports.sendCurrentCallToDB = async (questionToSend ) => {
 console.log("questionToSend in sendCurrentCallToDB", questionToSend);
  if (!questionToSend.question){
    console.log("Not a valid question.")
    return
  }
   
  //  const { _id : newQuestionID } = questionToSend;
  const { _id } = questionToSend;
  const newQuestionID = _id;

  const currentQuestion_Id = "a98108a6-b3b3-47de-a273-9dfbc989f4dd";
  // TODO Need better way of identifying the Current Question field in the database?
  // TODO find the first id in the array
  // console.log("Current Question doc id", currentQuestionId);
  console.log("setting as Current Question:", newQuestionID);
  try {
    // Define the mutation object
    const mutation = {
      patch: {
        id: currentQuestion_Id, // Use the provided questionId
        set: {
          question: {
            _type: "reference",
            _ref: newQuestionID, // Reference the question using _ref
          },
          questionInProgress: true,
          blankListenerScreen: false,
        },
      },
    };

    // Send the mutation using fetch
    const apiUrl = `${process.env.GATSBY_MUTATE_SANITY_API_URL}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GATSBY_SANITY_TOKEN}`,
      },
      body: JSON.stringify({ mutations: [mutation] }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Document updated (Current call sent to DB):", result);
    } else {
      console.error("Failed to update document:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

exports.updateCurrentQuestionNotInProgress = async () => {
  const currentQuestion_Id = "a98108a6-b3b3-47de-a273-9dfbc989f4dd";
  // TODO Need better way of identifying the Current Question field in the database?
  // TODO find the first id in the array
  // console.log("Current Question doc id", currentQuestionId);
  console.log("setting as Current Question as not in progress");
  try {
    // Define the mutation object
    const mutation = {
      patch: {
        id: currentQuestion_Id, // Use the provided questionId
        set: {
          questionInProgress: false,
        },
      },
    };

    // Send the mutation using fetch

    const apiUrl = `${process.env.GATSBY_MUTATE_SANITY_API_URL}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GATSBY_SANITY_TOKEN}`,
      },
      body: JSON.stringify({ mutations: [mutation] }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Document updated (Current call marked as not in progress):", result);
    } else {
      console.error("Failed to update document:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

exports.makeScreenBlankTemp = async () => {

  const currentQuestion_Id = "a98108a6-b3b3-47de-a273-9dfbc989f4dd";
  // TODO Need better way of identifying the Current Question field in the database?
  // TODO find the first id in the array
  // console.log("Current Question doc id", currentQuestionId);
  console.log("making listener blank");
  try {
    // Define the mutation object
    const mutation = {
      patch: {
        id: currentQuestion_Id, // Use the provided questionId
        set: {
          blankListenerScreen: true,
        },
      },
    };

    // Send the mutation using fetch
    const apiUrl = `${process.env.GATSBY_MUTATE_SANITY_API_URL}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GATSBY_SANITY_TOKEN}`,
      },
      body: JSON.stringify({ mutations: [mutation] }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Document updated (Current call sent to DB):", result);
    } else {
      console.error("Failed to update document:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating document:", error);
  }
};



exports.askQuestion = async (
  question,
) => {
  // console.log("asking q");
   exports.sendCurrentCallToDB(question);
  // - updates as having been asked
   exports.updateQuestionBeenAsked(question);
};

exports.swapToAlternativeQuestionDB = async (potentialQ_Id, altQuestion, originalQuestion) => {
  try {
    // Define the mutation object
    const mutation = {
      patch: {
        id: potentialQ_Id,
        set: {
          question: altQuestion,
          altQuestion: originalQuestion,
        },
      },
    };

    // Send the mutation using fetch
    const apiUrl = `${process.env.GATSBY_MUTATE_SANITY_API_URL}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GATSBY_SANITY_TOKEN}`,
      },
      body: JSON.stringify({ mutations: [mutation] }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(
        `Document updated  - alt and orig question swapped"):`,
        result,
      );
    } else {
      console.error("Failed to update document:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

exports.fetchQuestion = async (question_id) => {
  console.log("fetching q")
  try {
    // Construct the API URL for fetching a single question by ID
    const apiUrl = `${process.env.GATSBY_SANITY_API_URL}/data/question/${question_id}`;
console.log("apiUrl", apiUrl);
    // Send a GET request to fetch the question
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GATSBY_SANITY_TOKEN}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Question fetched successfully:", result);
      return result; // Return the fetched question data if needed
    } else {
      console.error("Failed to fetch question:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching question:", error);
  }
};




exports.markAllQuestionsAsUnasked = async () => {
 try {
   // Define the mutation object
   const mutation = {
     patch: {
      query: "*[_type == 'question']",
       set: {
         beenAsked: false,
       },
     },
   };

   // Send the mutation using fetch
   const apiUrl = `${process.env.GATSBY_MUTATE_SANITY_API_URL}`;
   const response = await fetch(apiUrl, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${process.env.GATSBY_SANITY_TOKEN}`,
     },
     body: JSON.stringify({ mutations: [mutation] }),
   });

   if (response.ok) {
     const result = await response.json();
     console.log(
       `Document updated  - all questions marked as not asked"):`,
       result,
     );
   } else {
     console.error("Failed to update document:", response.statusText);
   }
 } catch (error) {
   console.error("Error updating document:", error);
 }
}

exports.markAllRapidFireAsUnasked = async () => {
  try {
    // Define the mutation object
    const mutation = {
      patch: {
        query: "*[_type == 'rapidFire']",
        set: {
          beenAsked: false,
        },
      },
    };

    // Send the mutation using fetch
    const apiUrl = `${process.env.GATSBY_MUTATE_SANITY_API_URL}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GATSBY_SANITY_TOKEN}`,
      },
      body: JSON.stringify({ mutations: [mutation] }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(
        `Document updated  - all questions marked as not asked"):`,
        result,
      );
    } else {
      console.error("Failed to update document:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

