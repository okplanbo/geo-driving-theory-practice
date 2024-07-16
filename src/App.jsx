import { useEffect } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import QuestionCard from "./QuestionCard";

import data from "./test_data.json";
import "./App.css";

const rand_id = Math.floor(Math.random() * data.length)
const questions = [data[rand_id]];

/** TBD:
 *** translations
 *** start, finish view, table with pagination
 *** i18n?
 *** ts support?
 */

function App() {
  useEffect(() => {
    console.log(data.length);
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold">B1 Theory Exam Practice</h1>
      <div className="card max-w-4xl">
        <ChakraProvider>
          {questions.slice(0, 30).map((question, index) => (
            <QuestionCard
              key={question.id}
              testSize={30}
              number={index + 1}
              question={question}
            />
          ))}
        </ChakraProvider>
      </div>
    </>
  );
}

export default App;
