import { useState } from "react";
import "./App.css";

/** TBD:
*** add translated json
*** add routing with pages: start view, test view, filtered table with questions
*** i18n?
*** ts support?
*/

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <img src="img1.avif" width="300" className="ml-auto mr-auto mb-6" alt="" />
      <h1 className="text-4xl font-bold">B1 theory exam practice</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
