import { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import ForgetPassword from "./components/ForgetPassword";
import ResetFormComponent from "./components/ResetFormComponent";
import Setting from "./components/DashboardSec/SettingCom";
import Edittask from "./components/Functinality/EditTask";
import Alltask from "./components/Cards/Tasks/Alltask";
import TaskCompletedTime from "./components/DashboardSec/Timer";
import UserGrid from "./components/Functinality/Developers/Alldeveloper";
import TaskyLandingPage from "./components/LandingPage";

const CreateTodo = lazy(() => import("./components/Functinality/Newtask"));
const Signin = lazy(() => import("./components/Signin"));
const Signup = lazy(() => import("./components/Signup"));
const HomePage = lazy(() => import("./components/HomePage"));
const UserProfile = lazy(() => import("./components/DashboardSec/UserProfile"));

const apiUrl = import.meta.env.VITE_API_URL;

import { platformStats, activityData } from "./components/DashboardSec/platformdata";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(null);
  const [todos, setTodos] = useState([]);
  const [userdata, setUserdata] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [alldeveloper, setAllDeveloper] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
      fetchData(token);
    } else {
      setAuthenticated(false);
      setIsloading(false);
    }
  }, []);

  const fetchDeveloperData = async () => {
    try {
      const response = await fetch(`${apiUrl}/user/Search/allUser`, {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        setAllDeveloper(data.totaluser);
        console.log("Developer data fetched:", data.totaluser);
      } else {
        console.log("Error fetching developer data");
      }
    } catch (err) {
      console.log("Developer data error:", err);
    }
  };

  const fetchData = async (token) => {
    try {
      setIsloading(true);
      await Promise.all([
        fetchTodos(token),
        fetchUserData(token),
        fetchDeveloperData()
      ]);
      setIsloading(false);
    } catch (err) {
      console.log(`Error fetching data: ${err}`);
      setIsloading(false);
    }
  };

  const fetchTodos = async (token) => {
    try {
      const response = await fetch(`${apiUrl}/user/alltodos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const res = await response.json();
      if (response.ok) {
        setTodos(res.todos);
        console.log("Todos fetched");
      } else {
        console.log("Error fetching todos");
      }
    } catch (err) {
      console.log("Todos fetch error", err);
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(`${apiUrl}/user/userprofile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const res = await response.json();
      if (response.ok) {
        setUserdata(res.userProfile);
        console.log("User data set");
      } else {
        console.log("Error fetching user data");
      }
    } catch (err) {
      console.log("User data fetch error", err);
    }
  };

  if (isAuthenticated === null || isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
        <div className="text-white text-xl text-center bg-black bg-opacity-70 p-6 rounded-lg">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Suspense fallback={"Loading..."}>
                <HomePage
                  todos={todos}
                  isAuthenticated={isAuthenticated}
                  setAuthenticated={setAuthenticated}
                  userdata={userdata}
                  setUserdata={setUserdata}
                />
              </Suspense>
            ) : (
              <Suspense fallback={"Loading..."}>
                <TaskyLandingPage />
              </Suspense>
            )
          }
        />
        <Route path="*" element={<div>Page Not Found</div>} />
        <Route
          path="/signup"
          element={
            <Suspense fallback={"Loading..."}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/homepage"
          element={
            <Suspense fallback={"Loading..."}>
              <HomePage
                todos={todos}
                isAuthenticated={isAuthenticated}
                setAuthenticated={setAuthenticated}
                setTodos={setTodos}
                userdata={userdata}
              />
            </Suspense>
          }
        />
        <Route
          path="/allDeveloper"
          element={
            <Suspense fallback={"Loading..."}>
              <UserGrid users={alldeveloper} />
            </Suspense>
          }
        />
        <Route
          path="/EditTask"
          element={
            <Suspense fallback={"Loading..."}>
              <Edittask setTodos={setTodos} />
            </Suspense>
          }
        />
        <Route
          path="/userProfile"
          element={
            <Suspense fallback={"Loading..."}>
              <UserProfile userdata={userdata} platformStats={platformStats} activityData={activityData} />
            </Suspense>
          }
        />
        <Route
          path="/setting"
          element={
            <Suspense fallback={"Loading..."}>
              <Setting userdata={userdata} />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={"Loading..."}>
              <Signin setAuthenticated={setAuthenticated} />
            </Suspense>
          }
        />
        <Route
          path="/forgetpassword"
          element={
            <Suspense fallback={"Loading..."}>
              <ForgetPassword />
            </Suspense>
          }
        />
        <Route
          path="/createNewTask"
          element={
            <Suspense fallback={"Loading..."}>
              <CreateTodo setTodos={setTodos} />
            </Suspense>
          }
        />
        <Route
          path="/taskStat"
          element={
            <Suspense fallback={"Loading..."}>
              <TaskCompletedTime todos={todos} />
            </Suspense>
          }
        />
        <Route
          path="/reset-password/:resetToken"
          element={
            <Suspense fallback={"Loading..."}>
              <ResetFormComponent />
            </Suspense>
          }
        />
        <Route
          path="/todos"
          element={
            isAuthenticated ? (
              <Suspense fallback={"Loading..."}>
                <Alltask todos={todos} />
              </Suspense>
            ) : (
              <Suspense fallback={"Loading..."}>
                <Signin setAuthenticated={setAuthenticated} />
              </Suspense>
            )
          }
        />
        <Route
          path="/createtodo"
          element={
            isAuthenticated ? (
              <Suspense fallback={"Loading..."}>
                <CreateTodo />
              </Suspense>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
