import { lazy } from "react";
import { Route, Routes } from "react-router";

const Login = lazy(() => import("@/pages/login"));
const StudySet = lazy(() => import("@/pages/studyset"));

export const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route
                path="studyset/:studySetId/flashcards"
                element={<StudySet />}
            />
        </Routes>
    );
};
