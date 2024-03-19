import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlaces from "./places/pages/NewPlaces";
import ErrorElement from "./utils/ErrorElement";
import { Outlet } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

const AppLayout = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};

const route = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Users />,
      },
      { path: "/places/new", element: <NewPlaces /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={route}></RouterProvider>;
}

export default App;
