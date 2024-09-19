import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { getExcludedIds } from "./db";
import data from "./static_data_ru.json";

import { Home } from "./pages/Home";
import { ExcludedList } from "./pages/ExcludedList";
import { About } from "./pages/About";

import * as packageCfg from "../package.json";

import "./App.css";

const appName = packageCfg.name;

/* TBD:
 * husky pre commit linter
 * link to official questions and to Kate's repo https://github.com/katebienko/drivingTestGeorgia
 * random, next, prev buttons. set id to url
 * links to tickets in 'excluded' list and a small image
 * no such ticket page or/and general 404 page
 * load q separately and save them to db with versioning to reuse later
 * start, finish view, back/next/reset controls for test set of 30
 * 3 mistakes and fail
 * table of all q with pagination and filters
 * i18n: UI, language switcher
 * font consistency for i18n
 * offline mode
 */

function App() {
  const [excludedIds, setExcludedIds] = useState([]);

  useEffect(() => {
    const loadExclusionStatus = async () => {
      const storedExcludedIds = await getExcludedIds();
      setExcludedIds(storedExcludedIds);
    };
    loadExclusionStatus();
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route
            path={`${appName}/`}
            element={<Home excludedIds={excludedIds} data={data} />}
          />
          <Route path={`${appName}/excluded`} element={<ExcludedList excludedIds={excludedIds} data={data} />} />
          <Route path={`${appName}/about`} element={<About />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
