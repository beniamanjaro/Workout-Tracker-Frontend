import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { useContext } from "react";
import HamburgerMenu from "./components/HamburgerMenu.jsx";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Workouts from "./pages/Workouts/Workouts.jsx";
import PrivateRoutes from "./utilis/PrivateRoutes.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import SignedInHeader from "./components/Header/SignedInHeader.jsx";
import Workout from "./pages/Workout/Workout.jsx";
import Exercises from "./pages/Exercises/Exercises.jsx";
import History from "./pages/History/History.jsx";

const Layout = ({ children }) => {
  return (
    <div className="bg-[#E7DF9F] flex w-full h-full min-w-screen min-h-screen">
      <div className="flex flex-col w-full items-center">
        <Header />
        {children}
        <HamburgerMenu />
      </div>
    </div>
  );
};

const PrivateLayout = ({ children }) => {
  return (
    <div className="bg-[#E7DF9F] flex w-full h-full min-w-screen min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full items-center">
        <SignedInHeader />
        {children}
        <HamburgerMenu />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route
          path="/workouts"
          element={
            <PrivateLayout>
              <Workouts />
            </PrivateLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route
          path="/workouts/:id"
          element={
            <PrivateLayout>
              <Workout />
            </PrivateLayout>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateLayout>
              <History />
            </PrivateLayout>
          }
        />
        <Route
          path="/exercises"
          exact
          element={
            <PrivateLayout>
              <Exercises />
            </PrivateLayout>
          }
        />
      </Route>
      <Route
        path="/"
        exact
        element={
          <Layout>
            <Home />
          </Layout>
        }
      ></Route>
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      ></Route>
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      ></Route>
      <Route path="*" element={<Navigate to="/" replace />}></Route>
    </Routes>
  );
};

export default App;
