import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import NineTenPage from "../pages/NineTenPage/NineTenPage";
import ElevenTwelvePage from "../pages/ElevenTwelvePage/ElevenTwelvePage";
import NineTenPhysics from "../pages/NineTenPage/NineTenPhysics";
import NineTenChemistry from "../pages/NineTenPage/NineTenChemistry";
import NineTenMath from "../pages/NineTenPage/NineTenMath";
import ElevenTwelvePhysics from "../pages/ElevenTwelvePage/ElevenTwelvePhysics";
import ElevenTwelveChemistry from "../pages/ElevenTwelvePage/ElevenTwelveChemistry";
import ElevenTwelveMath from "../pages/ElevenTwelvePage/ElevenTwelveMath";
import SingleQuizPage from "../components/shared/SingleQuizPage";
export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // ***caution
      // defining every pathname including  "-" sign. Because they will be dynamic
      {
        path: "/nine-ten",

        element: <NineTenPage />,
      },
      {
        path: "/eleven-twelve",
        element: <ElevenTwelvePage />,
      },
      {
        path: "/nine-ten-physics",
        element: <NineTenPhysics />,
      },
      {
        path: "/nine-ten-chemistry",
        element: <NineTenChemistry />,
      },
      {
        path: "/nine-ten-math",
        element: <NineTenMath />,
      },
      {
        path: "/eleven-twelve-physics",
        element: <ElevenTwelvePhysics />,
      },
      {
        path: "/eleven-twelve-chemistry",
        element: <ElevenTwelveChemistry />,
      },
      {
        path: "/eleven-twelve-math",
        element: <ElevenTwelveMath />,
      },
      {
        path: "/quiz/:id",
        element: <SingleQuizPage />,
      },
    ],
  },

  {
    path: "/admin",
    element: "admin",
  },
]);
