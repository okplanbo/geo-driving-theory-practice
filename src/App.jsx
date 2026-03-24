import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider, Button, extendTheme } from "@chakra-ui/react";

import { getExcludedFromDB, updateExcludedToDB } from "./db";

const getDataByLanguage = async () => {
  const language = localStorage.getItem("language") || "en";
  const data = await import(`./static_data_${language}.json`);
  return data.default;
};

import { Home } from "./pages/Home";
import { ExcludedList } from "./pages/ExcludedList";
import { About } from "./pages/About";

import "./App.css";

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

function App() {
  const [excludedIds, setExcludedIds] = useState();
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState();
  const [isNumberInURLGood, setIsNumberInURLGood] = useState();
  const [data, setData] = useState([]);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  const queryParams = new URLSearchParams(location.search);
  let questionParam = queryParams.get("q");

  const getRandomQuestionNumber = (excludedIds) => {
    const activeQuestions = data.filter((question) => {
      return !excludedIds.includes(question.id);
    });
    const randomId = Math.floor(Math.random() * activeQuestions.length);
    return activeQuestions[randomId].id;
  };

  const initQuestion = async () => {
    if (data.length === 0) return;

    const queryParams = new URLSearchParams(location.search);
    questionParam = queryParams.get("q");
    const numericParam = Number(questionParam);

    const storedExcludedIds = await getExcludedFromDB();
    setExcludedIds(storedExcludedIds);

    const randomQuestionNumber = getRandomQuestionNumber(storedExcludedIds);

    const existingIds = data.map((question) => question.id);

    setIsNumberInURLGood(existingIds.includes(numericParam));

    setCurrentQuestionNumber(
      questionParam ? numericParam : randomQuestionNumber,
    );

    if (!questionParam) {
      queryParams.set("q", randomQuestionNumber);
      const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
      window.history.replaceState({}, "", newUrl);
      setIsNumberInURLGood(true);
    }
  };

  useEffect(() => {
    getDataByLanguage().then((data) => {
      setData(data);
    });

    initQuestion();
  }, [data, language]);

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
    const currentIndex = data.findIndex(
      (question) => question.id === currentQuestionNumber,
    );
    const nextQuestionNumber = data[(currentIndex + 1) % data.length].id;
    goToQuestion(nextQuestionNumber);
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
              path="/"
              element={
                <Home
                  excludedIds={excludedIds}
                  navigateHandler={navigateHandler}
                  updateExcluded={updateExcluded}
                  currentQuestionNumber={currentQuestionNumber}
                  handleRandomize={handleRandomize}
                  handleNext={handleNext}
                  setLanguage={setLanguage}
                  language={language}
                  data={data}
                />
              }
            />
            <Route
              path="/excluded"
              element={
                <ExcludedList
                  excludedIds={excludedIds}
                  currentQuestionNumber={currentQuestionNumber}
                  data={data}
                />
              }
            />
            <Route path="/about" element={<About />} />
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
