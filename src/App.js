import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import MyMatches from "./Components/MyMatches";
import UserList from "./Components/UserList";
import SignUp from "./Components/Form/SignUp";
import SignIn from "./Components/Form/SignIn";
import About from "./Components/About";
import UpdateProfile from "./Components/Form/UpdateProfile";
import "./Components/Style.css";
import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<About />} />
        <Route path="/my-matches" element={<MyMatches />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
