// import logo from "./logo.svg";
// import "./App.css";
import NewsFeed from "./components/NewsFeed";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  return (
    <div className="app">
      <CurrencyConverter />
      <NewsFeed />
    </div>
  );
}

export default App;
