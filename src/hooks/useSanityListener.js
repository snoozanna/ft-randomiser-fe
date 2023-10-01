import { useEffect, useState } from "react";

const useSanityListener = (client) => {
  const [questionsListen, setQuestionsListen] = useState([]);

  //Listen for data changes in Sanity
  const query = '*[_type == "questions"]';
  const params = {};

  fetchQuestionsListen();

  useEffect(() => {
    const subscription = client
      .listen(query, params)
      .subscribe((newQuestionsListen) => {
        console.log(JSON.stringify(newQuestionsListen.result, null, 4));

        let item = newQuestionsListen.result;

        let questions = [...questionsListen, item];
        setQuestionsListen(questions);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [client]);

  function fetchQuestionsListen() {
    client.fetch(query, params).then((questionsListen) => {
      console.log(questionsListen);
      setQuestionsListen(questionsListen);
    });
  }

  return { questionsListen, setQuestionsListen };
};

export default useSanityListener;
