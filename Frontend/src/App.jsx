import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from "./COMPONENTS/JSX/Header";
import Login from "./COMPONENTS/JSX/Login";
import SignUp from "./COMPONENTS/JSX/SignUp";
import Terms from "./COMPONENTS/JSX/Terms";
import ForgotPassword from "./COMPONENTS/JSX/ForgotPassword";
import Chat from "./COMPONENTS/JSX/Chat";
import {useEffect } from "react";

function App() {

  useEffect(() => {
    localStorage.setItem("ResponseMode", "Normal");
  }, [])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Chat />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/SignUp" element={<SignUp />}/>
        <Route path="/Terms" element={<Terms />}/>
        <Route path="/ForgotPassword" element={<ForgotPassword />}/>
      </Routes>
    </Router>
  )
}

export default App;
