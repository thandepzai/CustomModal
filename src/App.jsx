import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const elements = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <div className="App">
      <ToastContainer />
      {elements}
    </div>
  );
}

export default App;
