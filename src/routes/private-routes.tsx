import { MainLayout } from "@/components/layout";
import { lazy } from "react";
import { Route, Routes } from "react-router";

const Home = lazy(() => import("@/pages/home"));
const StudySet = lazy(() => import("@/pages/studyset"));

export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route
                    path="studyset/:studySetId/flashcards"
                    element={<StudySet />}
                />
            </Route>
        </Routes>
    );
};
