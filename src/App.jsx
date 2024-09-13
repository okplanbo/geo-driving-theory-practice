import { useEffect, useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import QuestionCard from "./QuestionCard";

import { getExcludedIds } from "./db";

import data from "./static_data_ru.json";
import "./App.css";

const getRandomId = () => Math.floor(Math.random() * data.length);

/* TBD:
 * error indication, green if correct answer + if wrong show which was correct
 * start, finish view, back/next/reset controls
 * table of all q with pagination and filters
 * i18n: UI, language switcher
 * font consistency for i18n
 * offline mode
 * ts support?
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
      <div className="max-w-4xl p-6">
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
      <div className="mt-auto flex flex-row self-end h-full gap-4 justify-center text-neutral-400 text-sm">
        <span>Questions: {data.length}</span>
        <span>Active: {data.length - excludedIds.length}</span>
        <span>Excluded: {excludedIds.length}</span>
      </div>
    </>
  );
}

export default App;
