import { MainLayout } from "@/components/layout";
import { lazy } from "react";
import { Route, Routes } from "react-router";

const Home = lazy(() => import("@/pages/home"));
const StudySet = lazy(() => import("@/pages/studyset"));
const MyStudySets = lazy(() => import("@/pages/my-studysets"));
const Leaderboard = lazy(() => import("@/pages/leaderboard"));
const EditFlashcards = lazy(() => import("@/pages/edit-flashcards"));

export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="flashcards/:id" element={<StudySet />} />
                <Route path="my-studysets" element={<MyStudySets />} />
                <Route
                    path="flashcards/:id/edit"
                    element={<EditFlashcards />}
                />
            </Route>

            <Route path="leaderboard" element={<Leaderboard />} />
        </Routes>
    );
};
