import { Link } from "react-router-dom";

import { createBrowserHistory } from "history";

import { Button, Tooltip } from "@chakra-ui/react";

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
}) {
  const question = data[currentQuestionNumber - 1] || null;

  useEffect(() => {
    history.listen((update) => {
      if (["PUSH", "POP"].includes(update.action)) {
        navigateHandler();
      }
    });
  }, []);

  return (
    <>
      <div className="flex flex-row items-baseline md:items-start">
        <h1 className="mr-4 text-xl font-bold md:text-3xl">B,B1 theory test</h1>
        <Tooltip
          maxWidth={200}
          label="Pick a new random question from the active ones"
        >
          <Button colorScheme="teal" onClick={handleRandomize}>
            Randomize
          </Button>
        </Tooltip>
      </div>
      <div className="max-w-3xl p-6">
        {question && (
          <QuestionCard
            key={question.id}
            testSize={30}
            // number={index + 1}
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
      <div className="flex flex-row justify-center gap-4 text-sm text-neutral-400">
        <span>Questions: {data.length}</span>
        <span>Active: {data.length - excludedIds.length}</span>
        {excludedIds.length ? (
          <Link className="cursor-pointer font-normal" to="excluded">
            Excluded: {excludedIds.length}
          </Link>
        ) : (
          <>Excluded: {excludedIds.length}</>
        )}
      </div>
    </>
  );
}
