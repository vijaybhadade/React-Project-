import { useState } from "react";
// import Dummany from "./Components/Dummany.jsx";
// import SearBar from "./Components/SearBar.jsx";
import JokeShow from "./Components/JokeShow.jsx";
function App() {
  // const [search, setSearch] = useState(""); // 🔥 REQUIRED

  return (
    <>
    <JokeShow/>
      {/* <SearBar onSearch={setSearch} />
      <Dummany search={search} /> */}

    </>
  );
}

export default App;