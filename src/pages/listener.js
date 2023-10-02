// import React from "react";
// import { useEffect, useState } from "react";
// import useSanityListener from "./../hooks/useSanityListener.js";
// import { createClient } from "@sanity/client";

// function ListenerPage() {
//   const client = createClient({
//     projectId: "vlp0qz8p",
//     dataset: "production",
//     apiVersion: "v2021-03-25",
//     useCdn: false, // `false` if you want to ensure fresh data
//   });

//   // const { questionsListen } = useSanityListener(client);

//   const [questions, setQuestions] = useState([]);
//   // const [chartData, setChartData] = useState({});
//   console.log("client", client);

//   useEffect(() => {
//     if (questionsListen && questionsListen.length > 0) {
//       console.log(questionsListen);
//       // let categories = [

//       // ];

//       // let salesData = labels.map((label) => {
//       //   console.log(label);

//       //   const monthData = salesRecords.filter(
//       //     (record) => record.month === label,
//       //   );

//       //   console.log(monthData);

//       //   return monthData[0].totalsales;
//       // });
//       //let salesData = salesRecords.map(record => record.totalsales);

//       // console.log(labels);
//       // console.log(salesData);

//       // const data = {
//       //   labels: labels,
//       //   datasets: [
//       //     {
//       //       label: "Sales Data Set",
//       //       backgroundColor: "rgba(255,99,132,0.2)",
//       //       borderColor: "rgba(255,99,132,1)",
//       //       borderWidth: 1,
//       //       hoverBackgroundColor: "rgba(255,99,132,0.4)",
//       //       hoverBorderColor: "rgba(255,99,132,1)",
//       //       data: salesData,
//       //     },
//       //   ],
//       // };

//       // setChartData(data);

//       setQuestions(questionsListen);
//     }
//   }, [questionsListen]);

//   return (
//     <div className="ListenerPage">
//       <h1>Questions</h1>
//       {questions.map((question) => {
//         <p>{question.question}</p>;
//       })}
//     </div>
//   );
// }

// export default ListenerPage;
