import { MainLayout } from "@/components/layout";
import { lazy } from "react";
import { Route, Routes } from "react-router";

const Home = lazy(() => import("@/pages/home"));
const StudySet = lazy(() => import("@/pages/studyset"));
const Decks = lazy(() => import("@/pages/my-studysets"));

export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route
                    path="studyset/:studySetId/flashcards"
                    element={<StudySet />}
                />
                <Route path="my-studysets" element={<Decks />} />
            </Route>
        </Routes>
    );
};
