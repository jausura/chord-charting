import { Outlet, createBrowserRouter } from "react-router-dom";
import Song from "./components/Song";
import Songs from "./components/Songs";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Songs /> },
      { path: ":songname", element: <Song /> },
    ],
  },
]);

function MainLayout() {
  return (
    <>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
