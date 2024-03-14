import "./App.css";
import { PageProvider } from "./PageContext";

import Modes from "./components/ModeSelect";

function App() {
  return (
    <PageProvider>
      <div className="App font-TradeWinds bg-golf min-h-screen bg-cover relative flex flex-col items-center  ">
        <Modes />
      </div>
    </PageProvider>
  );
}

export default App;
