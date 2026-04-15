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
import PrivateRoute from "../components/shared/PrivateRoute";
import AdminRoute from "../components/shared/AdminRoute";
import AdminMain from "../pages/Admin/AdminMain";
import AddQuiz from "../pages/Admin/AddQuiz";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageQuizzes from "../pages/Admin/ManageQuizzes";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Profile from "../pages/Auth/Profile";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/quiz/:id",
        element: (
          <PrivateRoute>
            <SingleQuizPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminMain />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: <AddQuiz />,
      },
      {
        path: "quizzes",
        element: <ManageQuizzes />,
      },
      {
        path: "users",
        element: <ManageUsers />,
      },
    ],
  },
]);
