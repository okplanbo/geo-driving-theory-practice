import { useEffect, useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import QuestionCard from "./QuestionCard";

import { getExcludedIds } from "./db";

import data from "./static_data_ru.json";
import "./App.css";

const getRandomId = () => Math.floor(Math.random() * data.length);

/** TBD:
 *** language switcher
 *** start, finish view, table with pagination
 *** i18n for UI
 *** ts support?
 *** font consistency
 */

function App() {
  const [excludedIds, setExcludedIds] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const loadExclusionStatus = async () => {
      const storedExcludedIds = await getExcludedIds();
      setExcludedIds(storedExcludedIds);

      let id = getRandomId();

      while (storedExcludedIds.includes(id)) {
        id = getRandomId();
      }
      setQuestions([data[id]]);
    };
    loadExclusionStatus();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold">B/B1 theory exam practice</h1>
      <div className="card max-w-4xl">
        {questions.length ? (
          <ChakraProvider>
            {questions.slice(0, 30).map((question, index) => (
              <QuestionCard
                key={question.id}
                testSize={30}
                number={index + 1}
                question={question}
                excludedIds={excludedIds}
              />
            ))}
          </ChakraProvider>
        ) : (
          "loading"
        )}
      </div>
      <div className="mt-auto flex flex-row self-end h-full gap-4 justify-center font-light">
          <div>Questions: {data.length}</div>
          <div>Active: {data.length - excludedIds.length}</div>
          <div>Excluded: {excludedIds.length}</div>
        </div>
    </>
  );
}

export default App;
