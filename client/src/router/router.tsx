import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFoundPage from "../pages/NotFoundPage";
// import SignUpPage from "../pages/SignUpPage";
import { SignUpPage } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  { path: "/signup", element: <SignUpPage /> },
]);
export default router;
