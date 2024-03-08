import "./App.css";
import Modes from "./components/ModeSelect";

function App() {
  return (
    <div className="App font-TradeWinds bg-golf min-h-screen bg-cover relative flex flex-col items-center  ">
      <h1 className=" text-5xl text-white text-shadow-dark mb-2 mt-1">
        QuizBuilder
      </h1>

      <Modes />
    </div>
  );
}

export default App;
