import { lazy } from "react";
import { Route, Routes } from "react-router";

const Login = lazy(() => import("@/pages/login"));

export const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
        </Routes>
    );
};
