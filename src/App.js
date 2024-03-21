import "./App.css";
import { PageProvider } from "./context/PageContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./root/Root";
import Search from "./pages/Search";
import Popular from "./pages/Popular";
import MyQuiz from "./pages/MyQuiz";
import TakeQuiz from "./pages/TakeQuiz";
import EditQuiz from "./components/EditQuiz";
import NewQuiz from "./components/NewQuiz";

//fix thing in edit quiz

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/Search",
        element: <Search />,
      },
      {
        index: true,
        element: <Popular />,
      },
      {
        path: "/myquiz",
        element: <MyQuiz />,
      },
      {
        path: "/takequiz/:quizId",
        element: <TakeQuiz />,
      },
      {
        path: "/edit/:quizId",
        element: <EditQuiz />,
        error: (
          <div>I want to make it navigate back a page if this happens</div>
        ),
      },
      {
        path: "/newquiz",
        element: <NewQuiz />,
      },
    ],
  },
]);

function App() {
  return (
    <PageProvider>
      <div className="App font-TradeWinds bg-golf min-h-screen bg-cover relative flex flex-col items-center  ">
        <RouterProvider router={router} />
      </div>
    </PageProvider>
  );
}

export default App;
