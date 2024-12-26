import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider, Button, extendTheme } from "@chakra-ui/react";

import { getExcludedFromDB, updateExcludedToDB } from "./db";
import data from "./static_data_ru.json";

import { Home } from "./pages/Home";
import { ExcludedList } from "./pages/ExcludedList";
import { About } from "./pages/About";

import * as packageCfg from "../package.json";

import "./App.css";

const appName = packageCfg.name;
const lastId = data[data.length - 1].id;

const theme = extendTheme({
  // static light for now
  styles: {
    global: {
      html: {
        bg: "gray.50!important",
      },
      body: {
        bg: {
          md: "gray.50",
          base: "white",
        },
      },
    },
  },
});

/* TBD:
 * finish translations, i18n: UI, language switcher
 * images to static storage in another repo
 * move project to new domain
 * google auth
 * context, back/next buttons, categories, original ids
 * load q separately and save them to db with versioning to reuse later
 * table of all q with pagination and filters
 * dark mode, font consistency for i18n
 * 30 question training: start, finish view, 3 mistakes to fail
 * offline mode
 */

const getRandomQuestionNumber = (excludedIds) => {
  const activeQuestions = data.filter((question) => {
    return !excludedIds.includes(question.id);
  });
  const randomArrayId = Math.floor(Math.random() * activeQuestions.length);
  return activeQuestions[randomArrayId].id;
};

function App() {
  const [excludedIds, setExcludedIds] = useState();
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState();
  const [isNumberInURLGood, setIsNumberInURLGood] = useState();

  const queryParams = new URLSearchParams(location.search);
  const questionParam = queryParams.get("q");
  const numericParam = Number(questionParam);

  const initQuestion = async () => {
    const storedExcludedIds = await getExcludedFromDB();
    setExcludedIds(storedExcludedIds);

    const randomQuestionNumber = getRandomQuestionNumber(storedExcludedIds);

    setIsNumberInURLGood(
      !isNaN(numericParam) && // if it's a number
        numericParam > 0 && // if it's positive
        numericParam <= lastId, // if it's not bigger than last id
    );

    setCurrentQuestionNumber(
      questionParam ? Number(questionParam) : randomQuestionNumber,
    );

    if (!questionParam) {
      queryParams.set("q", randomQuestionNumber);
      const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
      window.history.replaceState({}, "", newUrl);
      setIsNumberInURLGood(true);
    }
  };

  useEffect(() => {
    initQuestion();
  }, []);

  const navigateHandler = () => {
    initQuestion();
  };

  const goToQuestion = (questionNumber) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("q", questionNumber);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.pushState({}, "", newUrl);
    setCurrentQuestionNumber(questionNumber);
    setIsNumberInURLGood(true);
  };

  const handleRandomize = () => {
    goToQuestion(getRandomQuestionNumber(excludedIds));
  };

  const handleNext = () => {
    const questionNumber =
      currentQuestionNumber < lastId ? currentQuestionNumber + 1 : 1;
    goToQuestion(questionNumber);
  };

  const updateExcluded = (newIds) => {
    updateExcludedToDB(newIds);
    setExcludedIds(newIds);
  };

  return (
    <ChakraProvider theme={theme}>
      {isNumberInURLGood !== undefined && isNumberInURLGood && (
        <Router>
          <Routes>
            <Route
              path={`${appName}/`}
              element={
                <Home
                  excludedIds={excludedIds}
                  navigateHandler={navigateHandler}
                  updateExcluded={updateExcluded} // yes, still refusing to use context api :>
                  currentQuestionNumber={currentQuestionNumber}
                  handleRandomize={handleRandomize}
                  handleNext={handleNext}
                  data={data}
                />
              }
            />
            <Route
              path={`${appName}/excluded`}
              element={
                <ExcludedList
                  excludedIds={excludedIds}
                  currentQuestionNumber={currentQuestionNumber}
                  data={data}
                />
              }
            />
            <Route path={`${appName}/about`} element={<About />} />
          </Routes>
        </Router>
      )}
      {questionParam &&
        isNumberInURLGood !== undefined &&
        !isNumberInURLGood && (
          <>
            Error! Bad question Id. Please check URL or..
            <Button className="mt-4" onClick={handleRandomize}>
              Randomize!
            </Button>
          </>
        )}
    </ChakraProvider>
  );
}

export default App;
