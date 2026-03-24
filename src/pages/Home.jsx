import { Link } from "react-router-dom";

import { createBrowserHistory } from "history";

import { Button, Tooltip, Select } from "@chakra-ui/react";

import QuestionCard from "./../components/QuestionCard";
import { useEffect } from "react";

const history = createBrowserHistory();

export function Home({
  excludedIds,
  data,
  currentQuestionNumber,
  handleRandomize,
  handleNext,
  updateExcluded,
  navigateHandler,
  setLanguage,
  language,
}) {
  const question =
    data.find((question) => question.id === currentQuestionNumber) || null;

  useEffect(() => {
    history.listen((update) => {
      if (["PUSH", "POP"].includes(update.action)) {
        navigateHandler();
      }
    });
  }, []);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <>
      <div className="flex flex-row items-baseline justify-between md:items-start">
        <h1 className="mr-4 text-xl font-bold md:text-3xl">B,B1 theory test</h1>
        <div className="flex flex-row gap-2">
          <Select value={language} onChange={handleLanguageChange} width="80px">
            <option value="en">En</option>
            <option value="ru">Ru</option>
          </Select>

          <Tooltip
            maxWidth={200}
            label="Pick a new random question from the active ones"
          >
            <Button colorScheme="teal" onClick={handleRandomize}>
              Randomize
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="max-w-3xl p-6">
        {question && language && (
          <QuestionCard
            key={question.id}
            testSize={30}
            language={language}
            question={question}
            excludedIds={excludedIds}
            updateExcluded={updateExcluded}
          />
        )}
        {question === null && "Error! There is no such question"}
      </div>
      <div className="mb-6 flex flex-row gap-4 md:hidden md:items-start">
        <Tooltip
          maxWidth={200}
          label="Pick a new random question from the active ones"
        >
          <Button colorScheme="teal" onClick={handleRandomize}>
            Randomize
          </Button>
        </Tooltip>
        <Button colorScheme="teal" onClick={handleNext}>
          Next
        </Button>
      </div>
      <div className="flex flex-col items-center gap-4 text-neutral-500">
        <div>Questions in total: {data.length}</div>
        <div className="flex flex-row justify-center gap-4">
          <span>Active: {data.length - excludedIds.length}</span>
          {excludedIds.length ? (
            <Link className="font-normal underline" to="excluded">
              Excluded: {excludedIds.length}
            </Link>
          ) : (
            <>Excluded: 0</>
          )}
        </div>
        <Link className="font-normal underline" to="about">
          About
        </Link>
      </div>
    </>
  );
}
