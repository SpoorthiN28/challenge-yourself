import { RouterProvider, createBrowserRouter } from "react-router-dom";

import WelcomePage from "./pages/Welcome";
import ChallengesPage from "./pages/Challenges";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    children: [
      { index: true, element: <WelcomePage /> },
      {
        path: '/challenges', element: <ChallengesPage />
      },
    ]
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
