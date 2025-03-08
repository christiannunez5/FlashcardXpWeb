import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router";
import { lazy } from "react";

const Login = lazy(() => import("@/pages/login"));
const Home = lazy(() => import("@/pages/home"));
const Landing = lazy(() => import("@/pages/landing"));

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/" element={<Landing />} />
                {/* 
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
