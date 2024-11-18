import { React, useEffect, useState } from "react";
import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ForgetPassword from "./components/ForgetPassword";
import ResetFormComponent from "./components/ResetFormComponent";
import UserProfile from "./components/DashboardSec/UserProfile";
import Setting from "./components/DashboardSec/SettingCom";
import Createtask from "./components/Functinality/Newtask";
import Edittask from "./components/Functinality/EditTask";
const apiUrl = import.meta.env.VITE_API_URL;
import { Navigate } from "react-router-dom";
// Lazy loading components
const CreateTodo = lazy(() => import("./components/Functinality/Newtask"));
import Alltask from "./components/Cards/Tasks/Alltask";
// this is the component fot the clock button
import TaskCompletedTime from "./components/DashboardSec/Timer";
import UserGrid from "./components/Functinality/Developers/Alldeveloper";
import TaskyLandingPage from "./components/LandingPage";
// const Todos = lazy(() => import("./components/Cards/Tasks/Alltask"));
const Signin = lazy(() => import("./components/Signin"));
const Signup = lazy(() => import("./components/Signup"));
const HomePage = lazy(() => import("./components/HomePage"));

function App() {
  const [isAuthenticated, setAuthenticated] = useState(null);
  const [todos, setTodos] = useState([]);
  const [userdata, setUserdata] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [alldeveloper,setAllDeveloper]=useState([]);

  
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
      fetchData(token);
      fetchDeveloperData()
    } else {
      setAuthenticated(false);
      setIsloading(false);
    }
  }, [isAuthenticated]);
  
  // loading ka logic hai niche jab tak fetch nahi hoga logind show hoga
  
  const fetchDeveloperData=async()=>{
        try{
            const response=await fetch(`${apiUrl}/user/Search/allUser`,{
                method:'GET',
            })
            const data= await response.json();
            if(response.ok){
              
              setAllDeveloper(data.totaluser);
              console.log("User data fetch for the all developer comp",data.totaluser);
            }else{
              console.log("Error in getting all develper data");
            }
        }catch(err){
            console.log("Error in fetching all developer data");
  
        }
  
  
    }
  const fetchData = async (token) => {
    try {
      setIsloading(true);
      await fetchTodos(token);
      await fetchUserData(token);
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
        console.log("Data fetched from database successfully");
        setTodos(res.todos); // Update todos state with the fetched todos
      } else {
        console.log("Error in fetching the data");
      }
    } catch (err) {
      console.log(`Error occurred: ${err}`);
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
        console.log("userdata set succesfull");
        console.log(res.userProfile);
      } else {
        console.log("Error in fetching the user data");
      }
    } catch (err) {
      console.log(`Error occured ${err}`);
    }
  };
  if (isAuthenticated == null || isLoading) {
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
              <Suspense fallback={<div className="spinner">Loading...</div>}>
                <TaskyLandingPage  />
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
              <UserProfile todos={todos} userdata={userdata} />
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
              <Createtask setTodos={setTodos} />
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
