import "./App.css";
import { PageProvider } from "./PageContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./root/Root";
import Search from "./pages/Search";
import Popular from "./pages/Popular";
import MyQuiz from "./pages/MyQuiz";

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
        path: "/Popular",
        element: <Popular />,
      },
      {
        path: "/MyQuiz",
        element: <MyQuiz />,
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
