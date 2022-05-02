import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Page/Main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
