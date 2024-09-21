import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { getExcludedFromDB, updateExcludedToDB } from "./db";
import data from "./static_data_ru.json";

import { Home } from "./pages/Home";
import { ExcludedList } from "./pages/ExcludedList";
import { About } from "./pages/About";

import * as packageCfg from "../package.json";

import "./App.css";

const appName = packageCfg.name;

/* TBD:
 * categories, original ids, finish translations
 * i18n: UI, language switcher
 * load q separately and save them to db with versioning to reuse later
 * start, finish view, back/next/reset controls for test set of 30
 * 3 mistakes and fail
 * table of all q with pagination and filters
 * font consistency for i18n
 * images to static storage
 * offline mode, pwa
 */

const getRandomId = (storedExcludedIds) => {
  const activeIds = data.map((item) => {
    return storedExcludedIds.includes(item.id) && item.id;
  });
  return Math.floor(Math.random() * activeIds.length);
};

function App() {
  const [excludedIds, setExcludedIds] = useState();
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState();

  const loadExclusionStatus = async () => {
    const queryParams = new URLSearchParams(location.search);
    const questionParam = queryParams.get("q");
    const storedExcludedIds = await getExcludedFromDB();
    setExcludedIds(storedExcludedIds);
    setCurrentQuestionNumber(
      questionParam ? Number(questionParam) : getRandomId(storedExcludedIds),
    );
  };

  useEffect(() => {
    loadExclusionStatus();
  }, []);

  const handleRandomize = () => {
    const queryParams = new URLSearchParams(location.search);
    const questionNumber = getRandomId(excludedIds) + 1;
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
    <ChakraProvider>
      {currentQuestionNumber && (
        <Router>
          <Routes>
            <Route
              path={`${appName}/`}
              element={
                <Home
                  excludedIds={excludedIds}
                  updateExcluded={updateExcluded} // yes, still refusing to use context api :>
                  currentQuestionNumber={currentQuestionNumber}
                  handleRandomize={handleRandomize}
                  data={data}
                />
              }
            />
            <Route
              path={`${appName}/excluded`}
              element={<ExcludedList excludedIds={excludedIds} data={data} />}
            />
            <Route path={`${appName}/about`} element={<About />} />
          </Routes>
        </Router>
      )}
    </ChakraProvider>
  );
}

export default App;
