import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Task from "./pages/Task";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Otpvalidate  from "./pages/Otpvalidate";
import Signup from "./pages/Signup";
import { saveProfile } from "./redux/actions/authActions";
import NotFound from "./pages/NotFound";
import LandingScreen   from "./components/LandingScreen";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";
import ExternalWebsite from "./components/ExternalSite";
import Tasks from "./components/Tasks";
import UserProfilePage from "./pages/UserProfilePage";
import {LOGOUT, SAVE_PROFILE} from "./redux/actions/actionTypes";


function App() {

  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    dispatch(saveProfile(token));
  }, [authState.isLoggedIn, dispatch]);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/signup" element={authState.isLoggedIn ? <Navigate to="/Home" /> : <Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Otpvalidate" element={<Otpvalidate/>} />
          <Route path="/tasks/add" element={authState.isLoggedIn ? <Task /> : <Navigate to="/login" state={{ redirectUrl: "/tasks/add" }} />} />
          <Route path="/tasks/:taskId" element={authState.isLoggedIn ? <Task /> : <Navigate to="/login" state={{ redirectUrl: window.location.pathname }} />} />
          <Route path="/userList" element={<UserList/>}/>
          <Route path="/userprofile" element={<UserProfilePage/>}/>
          <Route path="/tasks" element={<Tasks/>}/>
          <Route path="/groupChat" element={<ExternalWebsite/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
