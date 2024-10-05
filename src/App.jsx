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

const theme = extendTheme({
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
 * load q separately and save them to db with versioning to reuse later
 * images to static storage in another repo
 * context, back/next buttons, categories, original ids
 * import/export
 * table of all q with pagination and filters
 * dark mode, font consistency for i18n
 * 30 question training: start, finish view, 3 mistakes to fail
 * back/next/reset controls
 * offline mode, pwa
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

  const initQuestion = async () => {
    const queryParams = new URLSearchParams(location.search);
    const questionParam = queryParams.get("q");
    const storedExcludedIds = await getExcludedFromDB();
    const randomQuestionNumber = getRandomQuestionNumber(storedExcludedIds);
    setExcludedIds(storedExcludedIds);
    setCurrentQuestionNumber(
      questionParam ? Number(questionParam) : randomQuestionNumber,
    );
    if (!questionParam) {
      queryParams.set("q", randomQuestionNumber);
      const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }
  };

  useEffect(() => {
    initQuestion();
  }, []);

  const navigateHandler = () => {
    initQuestion();
  };

  const handleRandomize = () => {
    const queryParams = new URLSearchParams(location.search);
    const questionNumber = getRandomQuestionNumber(excludedIds);
    queryParams.set("q", questionNumber);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.pushState({}, "", newUrl);
    setCurrentQuestionNumber(questionNumber);
  };

  const updateExcluded = (newIds) => {
    updateExcludedToDB(newIds);
    setExcludedIds(newIds);
  };

  return (
    <ChakraProvider theme={theme}>
      {Number.isInteger(currentQuestionNumber) ? (
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
      ) : (
        <>
          Error, check URL
          <Button className="mt-4" onClick={handleRandomize}>
            Randomize
          </Button>
        </>
      )}
    </ChakraProvider>
  );
}

export default App;
