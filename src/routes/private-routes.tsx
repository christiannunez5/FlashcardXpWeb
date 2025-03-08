import { lazy } from "react";
import { Route, Routes } from "react-router";

const Home = lazy(() => import("@/pages/home"));

export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
};
