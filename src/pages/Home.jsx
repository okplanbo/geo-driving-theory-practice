import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import QuestionCard from "./../components/QuestionCard";

export function Home({ excludedIds, data }) {
  const [question, setQuestion] = useState();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ticketParam = queryParams.get("ticket");

  const getRandomId = (storedExcludedIds) => {
    const activeIds = data.map((item) => {
      return storedExcludedIds.includes(item.id) && item.id;
    });
    return Math.floor(Math.random() * activeIds.length);
  };

  useEffect(() => {
    let id = ticketParam ? Number(ticketParam) - 1 : getRandomId(excludedIds);
    setQuestion(data[id]);
  }, [ticketParam]);

  return (
    <>
      <h1 className="font-bold text-xl md:text-3xl">
        B/B1 theory exam practice
      </h1>
      <div className="max-w-3xl p-6">
        {question ? (
          <QuestionCard
            key={question.id}
            testSize={30}
            // number={index + 1}
            question={question}
            excludedIds={excludedIds}
          />
        ) : null}
      </div>
      <div className="mt-auto flex flex-row self-end h-full gap-4 justify-center text-neutral-400 text-sm">
        <span>Questions: {data.length}</span>
        <span>Active: {data.length - excludedIds.length}</span>
        <span>Excluded: {excludedIds.length}</span>
      </div>
    </>
  );
}
