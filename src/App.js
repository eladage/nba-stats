import logo from "./logo.svg";
import "./App.css";
import ResultsContainer from "./components/ResultsContainer";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>NBA teams</h1>
        </header>
      </div>
      <ResultsContainer />
      <div style={{ paddingTop: "20px", height: "50px", textAlign: "center" }}>
        Made by Eric Ladage
      </div>
    </>
  );
}

export default App;
