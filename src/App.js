import nbaLogo from "./logos/nba-logo.png";
import reactLogo from "./logos/react-logo.svg";
import "./App.css";
import ResultsContainer from "./components/ResultsContainer";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={nbaLogo} className="NBA-logo" alt="logo" />
          <img src={reactLogo} className="App-logo" alt="logo" />
        </header>
      </div>
      <ResultsContainer />
    </>
  );
}

export default App;
