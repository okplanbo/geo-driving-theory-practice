import { Link } from "react-router-dom";

import { Button, Tooltip } from "@chakra-ui/react";

import QuestionCard from "./../components/QuestionCard";

export function Home({
  excludedIds,
  data,
  currentQuestionNumber,
  handleRandomize,
  updateExcluded,
}) {
  const question = data[currentQuestionNumber - 1] || null;

  return (
    <>
      <div className="flex flex-row items-baseline md:items-start">
        <h1 className="mr-4 text-xl font-bold md:text-3xl">B,B1 theory test</h1>
        <Tooltip
          maxWidth={200}
          label="Pick a new random question from the active ones"
        >
          <Button onClick={handleRandomize}>Randomize</Button>
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
      {/* <div className="mb-6 mt-auto flex h-full flex-row justify-center gap-4 text-sm text-neutral-400"> */}
      {/* <Button>Previous</Button> */}
      {/* <Button>Next</Button> */}
      {/* </div> */}
      <div className="mt-auto flex h-full flex-row justify-center gap-4 text-sm text-neutral-400">
        <span>Questions: {data.length}</span>
        <span>Active: {data.length - excludedIds.length}</span>
        <Link className="cursor-pointer font-normal" to="excluded">
          Excluded: {excludedIds.length}
        </Link>
      </div>
    </>
  );
}
